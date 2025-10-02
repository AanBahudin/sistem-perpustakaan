import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSearchParams } from "react-router-dom"

const StatusAkunPenggunaFilter = () => {

    const [searchParams] = useSearchParams()
    const defaultValue = searchParams.get('statusAkun') || ''
    const values = ['Nonaktif', 'Pending', 'Aktif']

    return (
        <Select defaultValue={defaultValue}>
            <SelectTrigger className="flex-1 bg-accent/30">
                <SelectValue className="!text-xs" placeholder="Status Akun" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel className="text-xs">Pilih salah satu</SelectLabel>
                    {values.map((item: string, index: number) => {
                        return (
                            <SelectItem key={index} value={item}>{item}</SelectItem>
                        )
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
  )
}

export default StatusAkunPenggunaFilter