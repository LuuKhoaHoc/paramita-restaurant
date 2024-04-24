import { extendTheme } from '@prismane/core/themes'

const theme = extendTheme({
  mode: window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
  colors: {
    primary: {
      100: '#6ad078',
      200: '#57ca67',
      300: '#44c455',
      400: '#33a242',
      500: '#39b54a',
      600: '#2d8e3a',
      700: '#277b32',
      800: '#004209',
      900: '#022306'
    }
  }
})
export default theme
