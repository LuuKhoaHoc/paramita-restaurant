import * as fs from 'fs'
import * as path from 'path'
import { createSchema } from 'graphql-yoga'
import { resolvers } from './graphql/resolvers'

export const schema = createSchema({
  resolvers,
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'graphql', 'schema.gql'),
    'utf-8'
  )
})
