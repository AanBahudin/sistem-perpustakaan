import { Input } from '../ui/input'
import { Label } from '../ui/label'

type InputFormTypes = {
    label: string,
    type: string,
    name: string,
    placeholder?: string
}

const InputForm = ({label, type, name, placeholder} : InputFormTypes) => {
  return (
    <div className='grid items-center gap-1.5 w-full'>
        <Label htmlFor={name}>{label}</Label>
        <Input autoFocus required type={type} id={name} name={name} placeholder={placeholder} className='mt-2' />
    </div>
  )
}

export default InputForm