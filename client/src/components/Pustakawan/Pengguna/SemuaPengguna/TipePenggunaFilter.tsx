import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const TipePenggunaFilter = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const fullParams = new URLSearchParams(searchParams)
  const roleParams = searchParams.get('role') || ''
  const selectValues: Array<string> = ['Semua', 'Dosen', 'Mahasiswa']

  const [roleValue, setRoleValue] = useState(roleParams)
  
  const setValueToParams = (value: string) => {
    const correctValue = ['Dosen', 'Mahasiswa']
    
    setRoleValue(value)
    if (correctValue.includes(value)) {
      fullParams.set('role', value)
    } else {
      fullParams.delete('role')
    }
    navigate(`?${fullParams.toString()}`)
  }


  return (
    <Select onValueChange={value => setValueToParams(value)} value={roleValue}>
      <SelectTrigger className="w-[40%] bg-accent/30 !text-xs">
        <SelectValue className="" placeholder="Jenis pengguna" />
      </SelectTrigger>
      <SelectContent className="!text-xs !placeholder:text-xs">
        <SelectGroup className="!text-xs !placeholder:text-xs">
          <SelectLabel className="text-xs">Pilih salah satu</SelectLabel>
          {selectValues.map((item: string, index: number) => {
            const value: string = item === 'Semua' ? 'All' : item
            return (
              <SelectItem key={index} value={value} className="!text-xs">{item}</SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default TipePenggunaFilter