import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import DialogEdit from './DialogContainer'

type ProfileDataPropsType = {
    label: string,
    value: string,
    name?: string,
    isEditable?: boolean,
}

const ProfileData = ({name, label, value, isEditable = false} : ProfileDataPropsType) => {
  return (
    <section className='col-span-1 grid items-center gap-1.5'>
        <Label className='font-normal'>{label}</Label>
        
        <div className='flex w-full gap-x-2 items-center justify-center'>
            <Input value={value} readOnly={true} className='mt-1 text-muted-foreground' />
            <DialogEdit isEditable={isEditable} name={name} />
        </div>
    </section>
  )
}

export default ProfileData