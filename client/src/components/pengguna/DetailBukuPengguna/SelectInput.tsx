import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectContent,
    SelectItem,
    SelectLabel
} from '@/components/ui/select'

const SelectInput = ({values} : {values: any}) => {
  return (
    <Select name='durasiPeminjaman' required>
        <SelectTrigger className="w-1/2" id='durasiPeminjaman'>
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