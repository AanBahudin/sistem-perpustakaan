import { setAlasan } from "@/cart/peminjamanSlice"
import { store } from "@/store"
import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"

type AlasanInputType = {
  defaultAlasan: any,
  perpanjangan?: any
}

const AlasanInput = ({defaultAlasan, perpanjangan} : AlasanInputType) => {
  return (
    <section className="w-full flex flex-col gap-y-2">
        <Label className="text-sm">Alasan</Label>
        <Textarea disabled={perpanjangan} name="alasan" id="alasan" defaultValue={defaultAlasan} maxLength={250} onChange={e => store.dispatch(setAlasan(e.target.value))} required placeholder="Alasan peminjaman" />
    </section>
  )
}

export default AlasanInput