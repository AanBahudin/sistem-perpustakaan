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
import { useSelector } from "react-redux"


const SelectInputCreatePengembalianData = ({selectData, kondisi} : {selectData: Array<string>, kondisi: string}) => {

    const { isMissingSwitch } = useSelector((state: any) => state.pengembalianState)

    return (
        <section className='flex flex-col'>
            <Label className='text-sm mb-1'>Kondisi Buku</Label>
            <p className='text-xs text-muted-foreground mb-1'>Tentukan keadaan buku saat dikembalikan.</p>
            <Select defaultValue={kondisi} name='kondisiBuku' disabled={isMissingSwitch} required>
                <SelectTrigger className="w-full text-xs">
                    <SelectValue placeholder="Pilih Kondisi Buku" className='!text-xs' />
                </SelectTrigger>
                <SelectContent className='!text-xs'>
                    <SelectGroup>
                        <SelectLabel>Kondisi</SelectLabel>
                        {selectData.map((item: string, index: number) => {
                            return (
                                <SelectItem className='text-xs' value={item} key={index}>{item}</SelectItem>
                            )
                        })}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </section>
    )
}

export default SelectInputCreatePengembalianData