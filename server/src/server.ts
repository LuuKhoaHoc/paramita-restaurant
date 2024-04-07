import express from 'express'
import { context } from './context'
import { createYoga } from 'graphql-yoga'
import { schema } from './schema'

const app = express()

const yoga = createYoga({
  schema,
  cors: {
    origin: 'https://paramita-restaurant.vercel.app',
    credentials: true
  },
  context
})

app.use('/graphql', yoga)

const server = app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/graphql')
})
