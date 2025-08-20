import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

const SwitchCreatePengembalianData = () => {

    const [switchValue, setSwitchValue] = useState(false)
    const handleSwitchChange = () => {
        setSwitchValue(!switchValue)
    }

    return (
        <div className='flex flex-col'>
            <Label className='text-sm mb-1'>Buku Hilang</Label>
            <p className='text-xs text-muted-foreground mb-2'>Laporan jika buku yang dikembalikan hilang</p>
            <div className="flex items-center space-x-2">
                <Switch
                    name='statusHilang'
                    onCheckedChange={handleSwitchChange}
                    // onChange={handleSwitchChange}
                    id="airplane-mode"  />
                <Label htmlFor="airplane-mode" className={`text-xs  ${switchValue ? 'text-destructive' : 'text-destructive/50'}`}>Buku Hilang</Label>
            </div>
        </div>
    )
}

export default SwitchCreatePengembalianData