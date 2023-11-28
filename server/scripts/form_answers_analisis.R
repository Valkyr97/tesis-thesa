library(tidyverse)
library(jsonlite)
library(forcats)

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

list(choices_dist, gender_x_disp_dist) %>%
  toJSON() %>%
  write_file(str_c(objective_path, "outfile.json"))

print("OK")
