import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { store } from "@/store"
import { setDurasiPeminjaman } from "@/cart/peminjamanFilterSheetSlice"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllPenerbit } from "@/actions/penerbitActions"

const PenerbitFilter = () => {

    const {isLoading, data: penulis} = useQuery({
        queryKey: ['penerbit'],
        queryFn: getAllPenerbit
    })
        
    const data = isLoading ? ['Memuat'] : ['Semua', ...penulis]
    
    const [searchParams] = useSearchParams()
    const {durasiPeminjaman} = useSelector((state: any) => state.peminjamanFilterSheetState)
    const initialParams = searchParams.get('durasiPeminjaman')?.toString() || durasiPeminjaman

    const handleChange = (value: string) => {
        store.dispatch(setDurasiPeminjaman(value))
    }
    
    useEffect(() => {
        store.dispatch(setDurasiPeminjaman(initialParams))
    }, [])

    return (
        <section className="w-full mt-4">
            <h1 className="text-sm font-semibold text-muted-foreground mb-2 capitalize">Penerbit Buku</h1>

            <Select 
                value={durasiPeminjaman} 
                onValueChange={(value) => handleChange(value)}>
                <SelectTrigger className="w-full !text-xs">
                    <SelectValue placeholder="Pilih penerbit" />
                </SelectTrigger>
                    <SelectContent>
                        <SelectGroup className="!text-xs">
                            <SelectLabel>Pilih penerbit</SelectLabel>
                                {data.map((item: any, index: number) => {
                                    return (
                                        <SelectItem value={item.toString()} key={index}>
                                            {item === 'Semua' ? item : `${item}`}
                                        </SelectItem>   
                                    )
                                }
                                )}
                        </SelectGroup>
                    </SelectContent>
            </Select>
        </section>
    )
}

export default PenerbitFilter