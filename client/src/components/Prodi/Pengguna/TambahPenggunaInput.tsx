import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type TambahPenggunaInputType = {
    name: string,
    label: string,
    type?: string,
    readonly?: boolean,
    placeholder?: string,
    defaultValue?: string,
    autofocus?: boolean,
    required?: boolean,
}

const TambahPenggunaInput = ({
    name, label, type = 'text', readonly = false, defaultValue,
    placeholder, autofocus = false, required = true
} : TambahPenggunaInputType) => {
  return (
    <section className="w-full flex flex-col gap-y-1.5">
        <Label htmlFor={name} className="text-xs">{label}</Label>
        <Input
            name={name} placeholder={placeholder} defaultValue={defaultValue}
            required={required} readOnly={readonly} autoFocus={autofocus} type={type}
            className="!text-xs placeholder:text-xs border-none"
        />
    </section>
  )
}

export default TambahPenggunaInput