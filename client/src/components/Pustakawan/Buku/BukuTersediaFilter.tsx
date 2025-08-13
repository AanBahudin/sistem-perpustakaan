import { setStatus } from "@/cart/bukuFilterSheetSlice"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { store } from "@/store"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const BukuTersediaFilter = () => {

    const correctValue = ['Tersedia', 'Tidak Tersedia']

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const fullParams = new URLSearchParams(searchParams) 

    const roleParams = searchParams.get('status') || ''

    const [roleValue, setRoleValue] = useState(roleParams)
    
    const setValueToParams = (value: string) => {
        store.dispatch(setStatus(value))
        setRoleValue(value)
        if (correctValue.includes(value)) {
            fullParams.set('status', value)
        } else {
            fullParams.delete('status')
        }
        navigate(`?${fullParams.toString()}`)
    }

    return (
        <Select onValueChange={value => setValueToParams(value)} value={roleValue}>
            <SelectTrigger className="w-[40%] bg-accent/30 !text-xs">
                <SelectValue className="text-xs" placeholder="Status Ketersediaan" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup className="text-xs">
                    <SelectLabel className="text-xs">Pilih salah satu</SelectLabel>
                    <SelectItem value="Semua">Semua</SelectItem>
                    {correctValue.map((item: string, index: number) => {
                        return (
                            <SelectItem className="!text-xs" key={index} value={item}>{item}</SelectItem>
                        )
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default BukuTersediaFilter