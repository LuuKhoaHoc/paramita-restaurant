import React from 'react'
import { Button, fr } from '@prismane/core'
import { useResponsive } from '~/utils/responsive'

const StyledButton = ({ children, ...props }) => {
  const { isMobile } = useResponsive()
  return (
    <Button
      size={ isMobile ? 'md' : 'lg'}
      variant='text'
      br={'none'}
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
