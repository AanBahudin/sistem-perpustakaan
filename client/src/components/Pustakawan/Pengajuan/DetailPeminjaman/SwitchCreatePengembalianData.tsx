import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

const SwitchCreatePengembalianData = () => {

    const [switchValue, setSwitchValue] = useState(false)
    const handleSwitchChange = () => {
        setSwitchValue(!switchValue)
    }

    return (
        <section className='flex flex-col'>
            <Label className='text-sm mb-1'>Buku Hilang</Label>
            <p className='text-xs text-muted-foreground mb-2'>Laporan jika buku yang dikembalikan hilang</p>
            <main className="flex items-center space-x-2">
                <Switch
                    name='statusHilang'
                    onCheckedChange={handleSwitchChange}
                    id="airplane-mode"  />
                <Label htmlFor="airplane-mode" className={`text-xs  ${switchValue ? 'text-destructive' : 'text-destructive/50'}`}>Buku Hilang</Label>
            </main>
        </section>
    )
}

export default SwitchCreatePengembalianData