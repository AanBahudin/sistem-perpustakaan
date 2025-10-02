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

const TambahPenggunaRoleSelectInput = () => {

    const values: Array<string> = ['Mahasiswa', 'Dosen']

    return (
        <section className="w-full flex flex-col gap-y-1.5">
            <Label htmlFor='role' className="text-xs">Jenis Pengguna</Label>
            <Select
                required name="role"
                defaultValue='Mahasiswa'
            >
                <SelectTrigger className="w-full !text-xs !border-none">
                    <SelectValue className="!text-xs" placeholder="Cari angkatan" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Jenis pengguna</SelectLabel>
                        {values.map((item: string) => {
                            return (
                                <SelectItem className="text-xs !border-none" value={item}>{item}</SelectItem>
                            )
                        })}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </section>
    )
}

export default TambahPenggunaRoleSelectInput