import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { store } from "@/store"
import { setVerifikasiProdi } from "@/cart/SheetFilterSlice"

const VerifikasiProdi = () => {
    const [searchParams] = useSearchParams()
    const fullParams = new URLSearchParams(searchParams)
    
    const value = ['Semua', 'Sudah', 'Belum']
    const {verifikasiProdi} = useSelector((state: any) => state.sheetState)
    const initialParams = searchParams.get('verifikasiProdi') || verifikasiProdi
    
    const handleChange = (value: string) => {
        store.dispatch(setVerifikasiProdi(value))
        if (value === 'Semua') fullParams.delete('verifikasiProdi')
        if (value === 'Sudah') {
            fullParams.set('verifikasiProdi', 'true')
        } else {
            fullParams.set('verifikasiProdi', 'false')
        }
    }

    return (
        <section className="w-full mt-4">
            <h1 className="text-sm font-semibold text-muted-foreground mb-2 capitalize">verifikasi program studi</h1>
            <Separator orientation="horizontal" />
            <ToggleGroup value={initialParams} onValueChange={handleChange} type="single" className="flex gap-x-2 mt-4 w-full rounded-none flex-wrap">
                {value.map((item: string, index:number) => {
                    const isActive = initialParams === item
                    return (
                        <ToggleGroupItem
                            asChild
                            value={item} 
                            key={index}>
                            <Button className={`${isActive ? 'bg-primary text-white' : 'hover:bg-muted'} w-[30%] duration-200 ease-in-out border px-3 text-xs rounded text-white`}>{item}</Button>
                        </ToggleGroupItem>
                    )
                })}
            </ToggleGroup>
        </section>
    )
}

export default VerifikasiProdi