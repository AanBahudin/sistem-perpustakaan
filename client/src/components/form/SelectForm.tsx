import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectLabel,
    SelectGroup,
    SelectValue,
  } from "@/components/ui/select"
  import { Label } from '@/components/ui/label'

type SelectFormTypes = {
    label: string
    name: string
    placeholder: string
    selectLabel: string
    values: string[]
}

const SelectForm = ({label, name, placeholder, selectLabel, values} : SelectFormTypes)  => {
  return (
    <div className="grid items-center gap-1.5">
        <Label htmlFor={name}>{label}</Label>
        <Select name={name}>
        <SelectTrigger className="w-full" id={name}>
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>{selectLabel || 'Pilih salah satu'}</SelectLabel>
                {values.map((item, index) => {
                    return (
                        <SelectItem key={index} value={item} className="capitalize">{item}</SelectItem>
                    )
                })}
            </SelectGroup>
        </SelectContent>
        </Select>
    </div>
  )
}

export default SelectForm