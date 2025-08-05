import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useSelector } from "react-redux"
import { setRole } from "@/cart/SheetFilterSlice"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSearchParams } from "react-router-dom"
import { store } from "@/store"
import { useEffect } from "react"

const RoleFilter = () => {
    const [searchParams] = useSearchParams()
    const fullParams = new URLSearchParams(searchParams)
     
    const value = ['Semua', 'Dosen', 'Mahasiswa']
    const { role } = useSelector((state: any) => state.sheetState)
    const initialParams = searchParams.get('role') || role

    const handleChange = (value: string) => {
        store.dispatch(setRole(value))
        if (value) {
            fullParams.set('role', value)
        } else {
            fullParams.delete('role')
        }
    }

    useEffect(() => {
        store.dispatch(setRole(initialParams))
    }, [])

    return (
        <section className="w-full mt-4">
            <h1 className="text-sm font-semibold text-muted-foreground mb-2">Tipe Pengguna</h1>
            <Separator orientation="horizontal" />
            <ToggleGroup defaultValue={initialParams} value={role} onValueChange={handleChange} type="single" className="flex gap-x-2 mt-4 w-full rounded-none flex-wrap">
                {value.map((item: string, index:number) => {
                    return (
                        <ToggleGroupItem
                            asChild
                            value={item} 
                            key={index}>
                            <Button className={`hover:bg-muted duration-200 ease-in-out border w-fit px-3 text-xs rounded text-white`}>{item}</Button>
                        </ToggleGroupItem>
                    )
                })}
            </ToggleGroup>
        </section>
    )
}

export default RoleFilter