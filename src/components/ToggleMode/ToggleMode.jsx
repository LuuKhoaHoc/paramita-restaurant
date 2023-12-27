import { Moon, Sun } from '@phosphor-icons/react'
import {
  Center,
  Circle,
  Icon,
  Transition,
  fr,
  usePrismaneTheme,
  useThemeModeValue
} from '@prismane/core'
import React from 'react'

const ToggleMode = () => {
  const { toggleThemeMode } = usePrismaneTheme()
  const icon = useThemeModeValue(<Moon weight='fill' />, <Sun weight='fill' />)
  return (
    <Transition
      pos={'fixed'}
      b={fr(4)}
      l={fr(4)}
      transition='all'
      timing='ease-in-out'
    >
      <Center>
        <Circle
          bg={(theme) => (theme.mode === 'dark' ? '#fff2e5' : '#1d2b1f')}
          onClick={toggleThemeMode}
          cl={(theme) => (theme.mode === 'dark' ? '#1d2b1f' : '#fff2e5')}
          size={fr(10)}
          cs={'pointer'}
        >
          <Icon>{icon}</Icon>
        </Circle>
      </Center>
    </Transition>
  )
}

export default ToggleMode
