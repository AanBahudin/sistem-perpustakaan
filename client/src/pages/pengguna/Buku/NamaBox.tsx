import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const NamaBox = ({nama} : {nama: string}) => {
  return (
    <div className="w-full flex flex-col gap-y-2">
        <Label className="text-sm">Nama Lengkap</Label>
        <div className="flex gap-x-2 items-center">
            <Input required placeholder="Nama anda" className="placeholder:text-sm" readOnly defaultValue={nama} disabled />
        </div>
    </div>
  )
}

export default NamaBox