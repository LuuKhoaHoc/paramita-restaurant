import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { PrismaneProvider } from '@prismane/core'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <BrowserRouter>
    <PrismaneProvider theme={theme}>
      <App />
    </PrismaneProvider>
    </BrowserRouter>
  </>
)
