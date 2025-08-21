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
import { useState, useEffect } from "react"

const SelectInputCreatePengembalianData = ({ selectData, kondisi,}: { selectData: Array<string>, kondisi: string}) => {
    const { isMissingSwitch } = useSelector((state: any) => state.pengembalianState)
    const [selectedValue, setSelectedValue] = useState(kondisi)

    // kalau switch ON → paksa balik ke kondisi
    useEffect(() => {
        if (isMissingSwitch) {
        setSelectedValue(kondisi)
        }
    }, [isMissingSwitch, kondisi])

    const handleChange = (value: string) => {
        if (isMissingSwitch) {
            // abaikan pilihan user, tetap set ke kondisi
            setSelectedValue(kondisi)
        } else {
            setSelectedValue(value)
        }
    }

    return (
        <section className="flex flex-col">
            <Label className="text-sm mb-1">Kondisi Buku</Label>
            <p className="text-xs text-muted-foreground mb-1">
                Tentukan keadaan buku saat dikembalikan.
            </p>

            <Select
                name="kondisiBuku"
                value={selectedValue}
                onValueChange={handleChange}
                required
            >
                <SelectTrigger className="w-full text-xs">
                    <SelectValue placeholder="Pilih Kondisi Buku" className="!text-xs" />
                </SelectTrigger>
                <SelectContent className="!text-xs">
                    <SelectGroup>
                        <SelectLabel>Kondisi</SelectLabel>
                            {selectData.map((item: string, index: number) => {
                                return (
                                    <SelectItem className="text-xs" value={item} key={index}>
                                        {item}
                                    </SelectItem>
                                )
                            })}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </section>
    )
}

export default SelectInputCreatePengembalianData
