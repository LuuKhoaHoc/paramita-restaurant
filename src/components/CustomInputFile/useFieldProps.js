// Hooks
import { useId } from '@prismane/core/hooks'
// Utils
import { splitProps } from './splitProps'

const useFieldProps = (props) => {
  const [rest, field] = splitProps(props, [
    'variant',
    'minLength',
    'maxLength',
    'name',
    'id',
    'placeholder',
    'type',
    'readOnly',
    'icon',
    'label',
    'error',
    'size',
    'validating',
    'disabled',
    'addons',
    'value',
    'checked',
    'defaultValue',
    'defaultChecked',
    'onChange',
    'onFocus',
    'onBlur'
  ])

  const id = useId()

  if (!field.name) {
    field.name = id
  }

  if (!field.id) {
    field.id = field.name
  }

  return [rest, field]
}

export default useFieldProps
