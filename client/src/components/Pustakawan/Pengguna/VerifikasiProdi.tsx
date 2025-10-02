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
import { useEffect } from "react"

const VerifikasiProdi = () => {
    const [searchParams] = useSearchParams()
    
    const value = ['Semua', 'Sudah', 'Belum']
    const values = ['Semua', 'true', 'false']
    const {verifikasiProdi} = useSelector((state: any) => state.sheetState)
    const initialParams = searchParams.get('verifikasiProdi') || verifikasiProdi
    
    const handleChange = (value: string) => {
        store.dispatch(setVerifikasiProdi(value))
    }

    useEffect(() => {
        store.dispatch(setVerifikasiProdi(initialParams))
    }, [])

    return (
        <section className="w-full mt-4">
            <h1 className="text-sm font-semibold text-muted-foreground mb-2 capitalize">verifikasi program studi</h1>
            <Separator orientation="horizontal" />
            <ToggleGroup defaultValue={initialParams} value={verifikasiProdi} onValueChange={handleChange} type="single" className="flex gap-x-2 mt-4 w-full rounded-none flex-wrap">
                {value.map((item: string, index:number) => {
                    return (
                        <ToggleGroupItem
                            asChild
                            value={values[index]} 
                            key={index}>
                            <Button className={`hover:bg-muted w-[30%] duration-200 ease-in-out border px-3 text-xs rounded text-white`}>{item}</Button>
                        </ToggleGroupItem>
                    )
                })}
            </ToggleGroup>
        </section>
    )
}

export default VerifikasiProdi