import { Animation, Center, Image } from '@prismane/core'
import { Rings } from 'react-loader-spinner'
import Logo from '../../images/Logo.png'
import { useAnimation } from '@prismane/core/hooks'

const Loading = () => {
  const { animating, duration, timing } = useAnimation(
    true,
    1000,
    'ease-in-out'
  )
  return (
    <Animation
      animation='fade'
      animated={animating}
      duration={duration}
      timing={timing}
    >
      <Center
        pos={'relative'}
        w={'100%'}
        mih={'100vh'}
        bg={'primary'}
        z={10000}
      >
        <Image
          src={Logo}
          alt='logo'
          w={250}
          h={250}
          fit='contain'
          pos={'absolute'}
          t={'50%'}
          l={'50%'}
          sx={{
            transform: 'translate(-47%, -48%)'
          }}
        />
        <Rings
          height='500'
          width='500'
          color='#fff'
          radius='6'
          wrapperStyle={{}}
          wrapperClass=''
          visible={true}
          ariaLabel='rings-loading'
        />
      </Center>
    </Animation>
  )
}

export default Loading
