import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const TambahPenggunaNomorHpInput = () => {

    const [value, setValue] = useState('')
    const handleValue = (value: string) => {
        const cleaned = value.replace(/[^0-9]/g, '')
        setValue(cleaned)
    }
    
    return (
        <section className="w-full flex flex-col gap-y-1.5">
            <Label htmlFor='no_hp' className="text-xs">Nomor telepon</Label>
            <main className="flex items-center gap-x-2">
                <Button size='icon' variant='default' type="button" className="!text-xs">+62</Button>
                <Input
                    max={11}
                    value={value} onChange={(e) => handleValue(e.target.value)}
                    name='no_hp' placeholder='Masukan nomor telepon'
                    required
                    className="!text-xs placeholder:text-xs border-none"
                />
            </main>
        </section>
    )
}

export default TambahPenggunaNomorHpInput