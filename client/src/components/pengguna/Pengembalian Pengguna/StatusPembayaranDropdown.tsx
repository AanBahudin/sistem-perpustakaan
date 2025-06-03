import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"

const StatusPembayaranDropdown = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const params = new URLSearchParams(searchParams)
    const pembayaran = searchParams.get('statusPembayaran') || 'Semua'

    const handleChange = useDebouncedCallback((value: any) => {
        if (value === 'Semua') {
            params.delete('statusPembayaran')
        } else {
            params.set('statusPembayaran', value)
        }
        
        navigate(`?${params.toString()}`)
    })
    
    return (
        <Select onValueChange={(e) => handleChange(e)} defaultValue={pembayaran}>
        <SelectTrigger className="w-1/3">
            <SelectValue placeholder="Status Pembayaran" />
        </SelectTrigger>

        <SelectContent>
            <SelectGroup>
                <SelectItem value="Semua">Semua</SelectItem>
                <SelectItem value="Dibayar">Dibayar</SelectItem>
                <SelectItem value="Belum Bayar">Belum Bayar</SelectItem>
            </SelectGroup>
        </SelectContent>
        </Select>
    )
}

export default StatusPembayaranDropdown