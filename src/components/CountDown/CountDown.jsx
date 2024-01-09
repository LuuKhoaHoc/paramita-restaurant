import { Text } from '@prismane/core'
import React, { useState, useEffect } from 'react'

const Countdown = ({ seconds }) => {
  const [timeLeft, setTimeLeft] = useState(seconds)

  useEffect(() => {
    if (!timeLeft) return

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timeLeft])

  return <Text>{timeLeft}</Text>
}

export default Countdown
