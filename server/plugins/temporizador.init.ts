export default defineNitroPlugin(async (nitroApp) => {
  //TODO: cambiar fecha de recoleccion de datos

  const oneTimeAtWeek = () => {
    // Define la fecha y hora actual
    const now: Date = new Date()

    // Obtiene el día de la semana (0 para domingo, 1 para lunes, etc.)
    const currentDayOfWeek: number = now.getDay()

    // Define la fecha y hora de la próxima ejecución semanal
    const nextExecution: Date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + (7 - currentDayOfWeek)
    )

    const timeUntilNextExecution: number =
      nextExecution.getTime() - now.getTime()

    setTimeout(async () => {
      // if (new Date().getDay() === 4) {
      await collectAnswersData()
      // }
      oneTimeAtWeek()
    }, timeUntilNextExecution)
  }

  oneTimeAtWeek()

  // const formUris = await Promise.all(
  //   files.map((file: any) => {
  //     return getFormById(file.id)
  //   })
  // )

  // const subscriptors = await Subscriptor.find()

  // for (let subs of subscriptors) {
  //   await sendSurveyEmail(
  //     subs.email,
  //     formUris.map((form) => ({
  //       title: form.info.title,
  //       uri: form.responderUri,
  //     }))
  //   )
  // }
})
