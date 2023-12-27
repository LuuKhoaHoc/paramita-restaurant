import React from 'react'
import { Button, fr } from '@prismane/core'

const StyledButton = ({ children, ...props }) => {
  return (
    <Button
      size='lg'
      variant='text'
      br={'none'}
      ff={'GeomanistMedium'}
      bdy={'1px solid'}
      bdc={'primary'}
      p={fr(7)}
      {...props}
    >
      {children}
    </Button>
  )
}
export default StyledButton
