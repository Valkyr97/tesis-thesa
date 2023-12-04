library(tidyverse)
library(jsonlite)
library(lubridate)

objective_path <- "server/scripts/"

questions <- fromJSON(read_file(str_c(objective_path, "args_questions.json")))

answers <- fromJSON(read_file(str_c(objective_path, "args_answers.json")))

data <- answers %>%
  right_join(questions, by = c("questionId"))

total_answers <- data %>%
  distinct(responseId) %>%
  nrow()

choices_dist <- data %>%
  filter(type == "CHOICE") %>%
  group_by(id, questionId, answer) %>%
  reframe(
    answer_count = n(),
    percent = answer_count * 100 / total_answers
  )

gender_x_disp_dist <- data %>%
  filter(questionId == "ob-4" | questionId == "ob-5") %>%
  select(
    questionId,
    responseId,
    answer
  ) %>%
  pivot_wider(
    names_from = questionId,
    values_from = answer,
    values_fn = list
  ) %>%
  unnest_longer(`ob-4`) %>%
  group_by(`ob-4`) %>%
  mutate(tdispositive_responses = n()) %>%
  ungroup() %>%
  unnest_longer(`ob-5`) %>%
  group_by(`ob-4`, `ob-5`) %>%
  reframe(
    gender_per_disp = n() / tdispositive_responses * 100
  )

ages <- data %>%
  filter(type == "DATE", questionId == "ob-0", !is.na(answer)) %>%
  mutate(
    age = floor(
      time_length(
        today() - ymd(answer),
        unit = "year"
      )
    )
  ) %>%
  filter(
    between(age, 5, 120)
  ) %>%
  select(
    age,
    id,
    questionId
  )

ages_group_dist <- ages %>%
  reframe(
    under_18 = sum(age < 18, na.rm = TRUE),
    range_18_34 = sum(between(age, 18, 34), na.rm = TRUE),
    range_35_50 = sum(between(age, 35, 50), na.rm = TRUE),
    over_50 = sum(age > 50, na.rm = TRUE)
  ) %>%
  pivot_longer(1:4, names_to = "answer", values_to = "answer_count") %>%
  mutate(
    percent = answer_count / sum(answer_count) * 100,
    questionId = "ob-0"
  ) %>%
  left_join(questions %>% select(id, questionId), by = "questionId")

age_insights <- ages %>%
  reframe(
    mean = mean(age, na.rm = TRUE),
    median = quantile(age, probs = 0.501, na.rm = TRUE, type = 1),
  )

choices_dist <- choices_dist %>%
  add_row(ages_group_dist)

choices_dist <- data %>%
  filter(questionId == "ob-4") %>%
  select(-c(choices, label, type, subtype)) %>%
  group_by(responseId) %>%
  filter(
    lengths(list(answer)) == 1,
  ) %>%
  group_by(answer) %>%
  reframe(
    unique_frequency = n(),
    unique_percent = unique_frequency * 100 / total_answers
  ) %>%
  right_join(choices_dist)

list(choices_dist, gender_x_disp_dist, age_insights) %>%
  toJSON() %>%
  write_file(str_c(objective_path, "outfile.json"))

print("OK")
