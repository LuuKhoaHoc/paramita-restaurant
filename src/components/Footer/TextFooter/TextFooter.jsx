import React from 'react'
import { Text } from '@prismane/core'

const TextFooter = ({ children, ...props }) => {
  return (
    <Text
      cl={(theme) =>
        theme.mode === 'dark'
          ? ['#fff', { hover: ['primary', 200] }]
          : ['#371b04', { hover: ['primary', 200] }]
      }
      {...props}
    >
      {children}
    </Text>
  )
}

export default TextFooter
