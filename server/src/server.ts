import express from 'express'
import { context } from './context'
import { createYoga } from 'graphql-yoga'
import { schema } from './schema'
import validateTokenMiddleware from './middleware/validateTokenMiddleware'

const app = express()

app.use(validateTokenMiddleware)

const yoga = createYoga({
  schema,
  context
})

app.use('/graphql', yoga)

const server = app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/graphql')
})
