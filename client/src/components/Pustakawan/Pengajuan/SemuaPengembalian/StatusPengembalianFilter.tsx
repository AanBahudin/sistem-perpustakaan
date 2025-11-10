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

const StatusPengembalianFilter = () => {

  const correctValue = ['Dikembalikan', 'Pending']
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const fullParams = new URLSearchParams(searchParams)
  const roleParams = searchParams.get('statusPengembalian') || ''

  const [statusValue, setStatusValue] = useState(roleParams)
  
  const setValueToParams = (value: string) => {
    
    setStatusValue(value)
    if (correctValue.includes(value)) {
      fullParams.delete('page')
      fullParams.set('statusPengembalian', value)
    } else {
      fullParams.delete('statusPengembalian')
    }
    navigate(`?${fullParams.toString()}`)
  }

  return (
    <Select onValueChange={value => setValueToParams(value)} value={statusValue}>
      <SelectTrigger className="w-[40%] bg-accent/30 !text-xs">
        <SelectValue className="!text-xs" placeholder="Status perpanjangan" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-xs">Pilih salah satu</SelectLabel>
          <SelectItem value="All">Semua</SelectItem>
          {correctValue.map((item: string, index: number) => {
            return (
              <SelectItem key={index} value={item}>{item}</SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default StatusPengembalianFilter