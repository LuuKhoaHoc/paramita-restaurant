import { Alert, Box } from '@prismane/core'
import React from 'react'

const AlertCustom = ({ message }) => {
  return <Alert closable>{message}</Alert>
}

export default AlertCustom
