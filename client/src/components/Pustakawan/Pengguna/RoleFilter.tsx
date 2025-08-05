import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSearchParams } from "react-router-dom"

const RoleFilter = () => {
    const [searchParams] = useSearchParams()
    const fullParams = new URLSearchParams(searchParams)
    const initialParams = searchParams.get('role') || 'Semua'


    const value = ['Semua', 'Dosen', 'Mahasiswa']
    const [roleValue, setRoleValue] = useState(initialParams)

    const handleChange = (value: string) => {
        setRoleValue(value)
        if (value) {
            fullParams.set('role', value)
        } else {
            fullParams.delete('role')
        }
    }

    return (
        <section className="w-full mt-4">
            <h1 className="text-sm font-semibold text-muted-foreground mb-2">Tipe Pengguna</h1>
            <Separator orientation="horizontal" />
            <ToggleGroup value={roleValue} onValueChange={handleChange} type="single" className="flex gap-x-2 mt-4 w-full rounded-none flex-wrap">
                {value.map((item: string, index:number) => {
                    const isActive = roleValue === item
                    return (
                        <ToggleGroupItem
                            asChild
                            value={item} 
                            key={index}>
                            <Button className={`${isActive ? 'bg-primary text-white' : 'hover:bg-muted'} duration-200 ease-in-out border w-fit px-3 text-xs rounded text-white`}>{item}</Button>
                        </ToggleGroupItem>
                    )
                })}
            </ToggleGroup>
        </section>
    )
}

export default RoleFilter