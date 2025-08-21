import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useSelector, useDispatch } from "react-redux"
import { setIsMissingSwitch } from "@/cart/pengembalianSlice"

const SwitchCreatePengembalianData = () => {
    const dispatch = useDispatch()
    const { isMissingSwitch } = useSelector((state: any) => state.pengembalianState)

    const handleSwitchChange = (checked: boolean) => {
        dispatch(setIsMissingSwitch(checked))
    }

    return (
        <section className="flex flex-col">
            <Label className="text-sm mb-1">Buku Hilang</Label>
            <p className="text-xs text-muted-foreground mb-2">
                Laporan jika buku yang dikembalikan hilang
            </p>
            <main className="flex items-center space-x-2">
                <Switch checked={isMissingSwitch} onCheckedChange={handleSwitchChange} />
                <Label htmlFor="statusHilang" className={`text-xs ${isMissingSwitch ? "text-destructive" : "text-destructive/50"}`}>
                    Buku Hilang
                </Label>

                {/* Hidden input supaya ikut terkirim di FormData */}
                <input type="hidden" name="statusHilang" value={isMissingSwitch ? "true" : "false"} />
            </main>
        </section>
  )
}

export default SwitchCreatePengembalianData
