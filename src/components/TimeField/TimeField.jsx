import { Field } from '@prismane/core'
import React from 'react'

const TimeField = ({ label, error, ...props }) => {
  return (
    <Field.Wrapper>
      <Field.Label>{label}</Field.Label>
      <Field type='time' {...props} />
      <Field.Error>{error}</Field.Error>
    </Field.Wrapper>
  )
}

export default TimeField
