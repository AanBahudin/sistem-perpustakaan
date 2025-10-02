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

const StatusPeminjamanFilter = () => {

  const correctValue = ['Dipinjam', 'Dikembalikan', 'Terlambat', 'Diajukan', 'Ditolak']
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const fullParams = new URLSearchParams(searchParams)
  const roleParams = searchParams.get('statusPeminjaman') || ''

  const [roleValue, setRoleValue] = useState(roleParams)
  
  const setValueToParams = (value: string) => {
    
    setRoleValue(value)
    if (correctValue.includes(value)) {
      fullParams.set('statusPeminjaman', value)
    } else {
      fullParams.delete('statusPeminjaman')
    }
    navigate(`?${fullParams.toString()}`)
  }

  return (
    <Select onValueChange={value => setValueToParams(value)} value={roleValue}>
      <SelectTrigger className="w-[40%] bg-accent/30 !text-xs">
        <SelectValue className="!text-xs" placeholder="Status peminjaman" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-xs">Pilih salah satu</SelectLabel>
          <SelectItem value="All">Semua</SelectItem>
            {correctValue.map((item: string, index: number) => {
              return (
                <SelectItem className="!text-xs" key={index} value={item}>{item}</SelectItem>
              )
            })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default StatusPeminjamanFilter