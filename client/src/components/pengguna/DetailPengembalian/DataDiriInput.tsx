import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type DataDiriInputType = {
  label: string,
  value: string
}

const DataDiriInput = ({value, label} : DataDiriInputType) => {
  return (
    <section className='w-full'>
        <Label className='text-muted-foreground mb-2 capitalize text-[12px]'>{label}</Label>
        <Input className='text-[12px]' disabled readOnly value={value} />
    </section>
  )
}

export default DataDiriInput