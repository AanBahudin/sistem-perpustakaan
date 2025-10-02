import { setAlasan } from "@/cart/peminjamanSlice"
import { store } from "@/store"
import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"

type AlasanInputType = {
  defaultAlasan: any,
  type?: string,
  perpanjangan?: any
}

const AlasanInput = ({defaultAlasan, perpanjangan, type='peminjaman'} : AlasanInputType) => {

  const isObjectEmpty = (Object.keys(perpanjangan || {})).length === 0
  const newDefaultAlasan = perpanjangan?.disetujui === 'Diterima' ? defaultAlasan : ''

  return (
    <section className="w-full flex flex-col gap-y-2">
        <Label className="text-sm">Alasan</Label>
        <Textarea disabled={newDefaultAlasan} name="alasan" id="alasan" defaultValue={newDefaultAlasan} maxLength={250} onChange={e => store.dispatch(setAlasan(e.target.value))} required placeholder={`Alasan ${type}`} />
    </section>
  )
}

export default AlasanInput