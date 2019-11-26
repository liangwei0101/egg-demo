import 'reflect-metadata'

import { Application } from 'egg'

export default async (app: Application) => {
  console.log('app-env', app.config.env)
  console.log('===============')
  console.log(app.graphql)
  console.log('===============')
  await app.graphql.init()
}