import 'reflect-metadata'

import { Application } from 'egg'

export default async (app: Application) => {
  await app.graphql.init()
}