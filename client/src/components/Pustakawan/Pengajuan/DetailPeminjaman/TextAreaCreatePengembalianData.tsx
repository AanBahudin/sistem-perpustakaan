import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const TextAreaCreatePengembalianData = () => {
  return (
    <div className='flex flex-col'>
        <Label className='text-sm mb-1'>Catatan Pengembalian</Label>
        <p className='text-xs text-muted-foreground mb-1'>Catatan mengenai pengembalian</p>
        <Textarea placeholder="Catatan pengembalian" className='!text-xs placeholder:text-xs' name='alasan' />
    </div>
  )
}

export default TextAreaCreatePengembalianData