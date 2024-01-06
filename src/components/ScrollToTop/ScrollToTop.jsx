import { CaretUp } from '@phosphor-icons/react'
import { Box, Center, Circle, Icon, fr } from '@prismane/core'
import React, { useEffect, useState } from 'react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <Center pos={'fixed'} b={fr(4)} r={fr(4)}>
      {isVisible && (
        <Circle
          bg={(theme) => (theme.mode === 'dark' ? '#fff2e5' : '#1d2b1f')}
          onClick={scrollToTop} // Here is the change
          cl={(theme) => (theme.mode === 'dark' ? '#1d2b1f' : '#fff2e5')}
          size={fr(10)}
          cs={'pointer'}
        >
          <Icon size={fr(8)}>
            <CaretUp weight='bold' />
          </Icon>
        </Circle>
      )}
    </Center>
  )
}

export default ScrollToTop