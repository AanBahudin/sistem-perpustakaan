import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { setDurasi } from "@/cart/peminjamanSlice"
import { store } from "@/store"
import { useQuery } from "@tanstack/react-query"
import { getDurasi } from "@/actions/durasiActions"

const SelectDurasi = ({durasi, defaultDurasi} : {durasi?: any, defaultDurasi: any}) => {

  const {data, isLoading} = useQuery({
    queryKey: ['durasi'],
    queryFn: getDurasi
  })

  const durasiPinjam = isLoading ? [] : data

  return (
    <div className="w-full flex flex-col gap-y-2">
        <Label className="text-sm">Durasi peminjaman</Label>
        <Select required disabled={defaultDurasi} defaultValue={defaultDurasi} onValueChange={e => store.dispatch(setDurasi(e))}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih durasi peminjaman" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Durasi</SelectLabel>
                    {durasiPinjam.map((item: any) => {
                        return <SelectItem key={item._id} value={item.durasi}>{item.durasi} Hari</SelectItem>
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
  )
}

export default SelectDurasi