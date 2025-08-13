import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { store } from "@/store"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { setStatus } from "@/cart/bukuFilterSheetSlice"

const StatusKetersediaanFilter = () => {

    const [searchParams] = useSearchParams()

    const {status} = useSelector((state: any) => state.bukuFilterSheetState)
    const initialParams = searchParams.get('status') || status

    const value = ['Semua', 'Tersedia', 'Tidak Tersedia']

    const handleChange = (value: string) => {
        store.dispatch(setStatus(value))
    }

    useEffect(() => {
        store.dispatch(setStatus(initialParams))
    }, [])

    return (
       <section className="w-full mt-4">
            <h1 className="text-sm font-semibold text-muted-foreground mb-2 capitalize">Status ketersediaan</h1>
            <ToggleGroup 
                defaultValue={initialParams} value={status} 
                onValueChange={handleChange} type="single" 
                className=" flex gap-2 w-full rounded-none flex-wrap">
                {value.map((item: string, index:number) => {
                    return (
                        <ToggleGroupItem
                            asChild
                            value={item} 
                            key={index}>
                            <Button className={`text-white hover:bg-muted min-w-[30%] duration-200 ease-in-out border px-3 text-xs rounded`}>{item}</Button>
                        </ToggleGroupItem>
                    )
                })}
            </ToggleGroup>
        </section>
    )
}

export default StatusKetersediaanFilter