import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectContent,
    SelectItem,
    SelectLabel
} from '@/components/ui/select'
import { store } from '@/store'
import { setDurasi } from '@/cart/detailBookSlice'

const SelectInput = ({values, status} : {values: any, status: string | undefined}) => {

    const handleDurasiPeminjaman = (value: string) => {
        store.dispatch(setDurasi(value))
    }

  return (
    <Select name='durasiPeminjaman' required onValueChange={handleDurasiPeminjaman}>
        <SelectTrigger className={`${!status ? '' : 'hidden'} w-1/2`} id='durasiPeminjaman'>
            <SelectValue placeholder='Lama peminjaman buku' />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Pilih salah satu</SelectLabel>
                {values.map((item:any, index: number) => {
                    const {durasi} = item
                    return (
                        <SelectItem key={index} value={durasi} className="capitalize">{durasi} Hari</SelectItem>
                    )
                })}
            </SelectGroup>
        </SelectContent>
    </Select>
  )
}

export default SelectInput