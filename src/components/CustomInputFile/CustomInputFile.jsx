// Components
import { Field } from '@prismane/core'
// Hooks
import useFieldProps from './useFieldProps'

const CustomInputFile = (
  { label, error, size = 'base', className, ...props },
  ref
) => {
  const [rest, field] = useFieldProps(props)

  return (
    <Field.Wrapper {...rest}>
      <Field.Label
        size={size}
        htmlFor={field.name}
        className='CustomInputFile-label'
      >
        {label}
      </Field.Label>
      <Field
        type='file'
        py={0}
        size={size}
        error={error}
        ref={ref}
        {...field}
      />
      <Field.Error size={size} className='CustomInputFile-error'>
        {error}
      </Field.Error>
    </Field.Wrapper>
  )
}

export default CustomInputFile
