import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { store } from "@/store"
import { setStatusAkun } from "@/cart/SheetFilterSlice"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const StatusAkunFilter = () => {

    const [searchParams] = useSearchParams()

    const {statusAkun} = useSelector((state: any) => state.sheetState)
    const initialParams = searchParams.get('statusAkun') || statusAkun

    const value = ['Semua', 'Aktif', 'Pending', 'Nonaktif']

    const handleChange = (value: string) => {
        store.dispatch(setStatusAkun(value))
    }

    useEffect(() => {
        store.dispatch(setStatusAkun(initialParams))
    }, [])

    return (
        <section className="w-full mt-4">
            <h1 className="text-sm font-semibold text-muted-foreground mb-2 capitalize">Status akun pengguna</h1>
            <Separator orientation="horizontal" />
            <ToggleGroup defaultValue={initialParams} value={statusAkun} onValueChange={handleChange} type="single" className="flex gap-x-2 mt-4 w-full rounded-none flex-wrap">
                {value.map((item: string, index:number) => {
                    return (
                        <ToggleGroupItem
                            asChild
                            value={item} 
                            key={index}>
                            <Button className={`text-white hover:bg-muted w-[30%] duration-200 ease-in-out border px-3 text-xs rounded`}>{item}</Button>
                        </ToggleGroupItem>
                    )
                })}
            </ToggleGroup>
        </section>
    )
}

export default StatusAkunFilter