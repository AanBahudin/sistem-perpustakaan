import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const TipePenggunaFilter = () => {
  return (
    <Select>
      <SelectTrigger className="w-[40%] bg-accent/30">
        <SelectValue className="!text-xs" placeholder="Jenis pengguna" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-xs">Pilih salah satu</SelectLabel>
          <SelectItem value="Dosen">Dosen</SelectItem>
          <SelectItem value="Mahasiswa">Mahasiswa</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default TipePenggunaFilter