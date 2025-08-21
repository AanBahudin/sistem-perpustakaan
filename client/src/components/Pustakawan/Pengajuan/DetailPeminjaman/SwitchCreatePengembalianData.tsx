import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useSelector } from "react-redux"
import { store } from "@/store"
import { setIsMissingSwitch } from "@/cart/pengembalianSlice"

const SwitchCreatePengembalianData = () => {

    const { isMissingSwitch } = useSelector((state: any) => state.pengembalianState)
    const handleSwitchChange = () => {
        store.dispatch(setIsMissingSwitch(!isMissingSwitch))
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
                <Label htmlFor="airplane-mode" className={`text-xs  ${isMissingSwitch ? 'text-destructive' : 'text-destructive/50'}`}>Buku Hilang</Label>
            </main>
        </section>
    )
}

export default SwitchCreatePengembalianData