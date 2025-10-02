import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const TambahPenggunaAngkatanSelectInput = () => {

    const getCurrentYear = new Date().getFullYear()
    const yearRange = Array.from({length: 18}).map((_, index:number) => (getCurrentYear - index).toString())

    return (
        <section className="w-full flex flex-col gap-y-1.5">
            <Label htmlFor='jurusan' className="text-xs">Angkatan (Khusus mahsiswa)</Label>
            <Select 
                required name="angkatan"
                defaultValue={getCurrentYear.toString()}
            >
                <SelectTrigger className="w-full !text-xs border-none">
                    <SelectValue className="!text-xs" placeholder="Cari angkatan" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Angkatan Mahasiswa</SelectLabel>
                        {yearRange.map((item: string) => {
                            return (
                                <SelectItem className="text-xs" value={item}>{item}</SelectItem>
                            )
                        })}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </section>
    )
}

export default TambahPenggunaAngkatanSelectInput