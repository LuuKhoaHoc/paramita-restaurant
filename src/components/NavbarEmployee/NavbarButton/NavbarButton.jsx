import { Button, Text, fr, useThemeModeValue } from '@prismane/core'

const NavbarButton = ({ icon, text, ...props }) => {
  const bgColor = useThemeModeValue('#fff', '#1e293b')
  const bgColorHover = useThemeModeValue('#f5f5f5', '#243143')
  return (
    <Button
      bg={[bgColor, { hover: bgColorHover }]}
      cl={['gray', 500]}
      icon={icon}
      full
      py={fr(4)}
      size='md'
      {...props}
    >
      {text}
    </Button>
  )
}
export default NavbarButton
