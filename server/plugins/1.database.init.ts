import 'reflect-metadata'
import dataSource from '../database/dataSource'

export default defineNitroPlugin((nitroApp) => {
  dataSource
    .initialize()
    .then(() => {
      console.log('database initialized')
    })
    .catch((error) => console.log('error', error))
})
