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
import { useSelector } from "react-redux"

type SelectDurasiType = {
  durasi?: any,
  defaultDurasi: any,
  perpanjangan?: any
}

const SelectDurasi = ({defaultDurasi, perpanjangan} : SelectDurasiType) => {

  const {data, isLoading} = useQuery({
    queryKey: ['durasi'],
    queryFn: getDurasi
  })

  const durasiPinjam = isLoading ? [] : data
  const isObjectEmpty = (Object.keys(perpanjangan || {}).length) === 0

  const durasi = useSelector((state: any) => state.peminjamanState.durasi)

  return (
    <div className="w-full flex flex-col gap-y-2">
        <Label className="text-sm">Durasi peminjaman</Label>
        <Select required disabled={!isObjectEmpty} defaultValue={defaultDurasi || durasi.toString()} name="durasi" onValueChange={(val) => store.dispatch(setDurasi(Number(val)))}>
          <SelectTrigger className="w-full" id="durasi" name="durasi"> 
            <SelectValue placeholder="Pilih durasi peminjaman" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Durasi</SelectLabel>
              {durasiPinjam.map((item: any) => {
                const durasiPerpanjangan = Number(item.durasi)
                return <SelectItem key={item._id} value={durasiPerpanjangan || durasi}>{item.durasi.toString() || durasi} Hari</SelectItem>
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
    </div>
  )
}

export default SelectDurasi