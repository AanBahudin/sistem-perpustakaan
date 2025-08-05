import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSearchParams } from "react-router-dom"

const StatusAkunFilter = () => {

    const [searchParams] = useSearchParams()
    const initialParams = searchParams.get('statusAkun') || 'Semua'


    const value = ['Semua', 'Aktif', 'Pending', 'Nonaktif']
    const [statusAkun, setStatusAkun] = useState(initialParams)

    const handleChange = (value: string) => {
        setStatusAkun(value)
    }

    return (
        <section className="w-full mt-4">
            <h1 className="text-sm font-semibold text-muted-foreground mb-2 capitalize">Status akun pengguna</h1>
            <Separator orientation="horizontal" />
            <ToggleGroup value={statusAkun} onValueChange={handleChange} type="single" className="flex gap-x-2 mt-4 w-full rounded-none flex-wrap">
                {value.map((item: string, index:number) => {
                    const isActive = statusAkun === item
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

export default StatusAkunFilter