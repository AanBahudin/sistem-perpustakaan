import { setAlasan } from "@/cart/peminjamanSlice"
import { store } from "@/store"
import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"

const AlasanInput = ({defaultAlasan} : {defaultAlasan: any}) => {
  return (
    <section className="w-full flex flex-col gap-y-2">
        <Label className="text-sm">Alasan</Label>
        <Textarea disabled={defaultAlasan} defaultValue={defaultAlasan} maxLength={300} onChange={e => store.dispatch(setAlasan(e.target.value))} required placeholder="Alasan peminjaman" />
    </section>
  )
}

export default AlasanInput