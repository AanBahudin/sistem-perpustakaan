import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"

const StatusAkunFilter = () => {

  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const fullParams = new URLSearchParams(searchParams)
  const params = searchParams.get('statusAkun') || 'Semua'

  const values: string[] = ['Semua', 'Aktif', 'Pending', 'Nonaktif']

  const handleSelectValue = useDebouncedCallback((value: string) => {
    if (value === 'Semua') {
      fullParams.delete('statusAkun')
    } else {
      fullParams.set('statusAkun', value)
    }
    navigate(`?${fullParams.toString()}`)
  }, 100)

  return (
    <Select defaultValue={params} onValueChange={handleSelectValue}>
      <SelectTrigger className="flex-1 !text-xs">
        <SelectValue className='' placeholder="Cari Berdasarkan status akun" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status Akun</SelectLabel>
          {values.map((item: string, index: number) => {
            return (
              <SelectItem className='text-xs' value={item} key={index}>{item}</SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default StatusAkunFilter