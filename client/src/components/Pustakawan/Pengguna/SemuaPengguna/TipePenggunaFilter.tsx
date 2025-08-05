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
      <SelectTrigger className="w-[40%] bg-accent/30">
        <SelectValue className="!text-xs" placeholder="Jenis pengguna" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-xs">Pilih salah satu</SelectLabel>
          <SelectItem value="All">Semua</SelectItem>
          <SelectItem value="Dosen">Dosen</SelectItem>
          <SelectItem value="Mahasiswa">Mahasiswa</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default TipePenggunaFilter