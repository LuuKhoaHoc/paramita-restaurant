import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink
} from '@apollo/client'
import { PrismaneProvider } from '@prismane/core'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://paramita-restaurant.onrender.com/graphql'
  }),
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <BrowserRouter>
      <PrismaneProvider theme={theme}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </PrismaneProvider>
    </BrowserRouter>
  </>
)
