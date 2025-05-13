import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {store} from '@/store'
import { setEdit } from "@/cart/profileSlice"
import { useSelector } from "react-redux"
import FormContainer from "@/components/form/FormContainer"
import { updateNamaAction } from "@/actions/userActions"
import SubmitButton from "@/components/form/SubmitButton"


const DialogEdit = ({isEditable, name} : {isEditable: boolean, name?: string}) => {

  const {tipe} = useSelector((state:any) =>state.profileState)
  const handleClick = () => {
    store.dispatch(setEdit(name))
  }
  
  return (
    <Dialog>
        <DialogTrigger asChild className={`${isEditable ? 'block' : 'hidden'}`}>
            <Button onClick={handleClick} variant='default'><Pencil className='stroke-primary-foreground dark:stroke-white' /></Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle className="capitalize">Perbaharui {tipe}</DialogTitle>
            <DialogDescription>
                Make changes to your profile here. Click save when you're done.
            </DialogDescription>

            </DialogHeader>
            <FormContainer action={updateNamaAction} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={tipe} className="text-right capitalize">
                  {tipe} Baru
                </Label>
                <Input required id={tipe} name={tipe} className="col-span-3 selection:text-white" />
              </div>
              <SubmitButton className='text-white mt-6 place-self-end w-fit' text="Save changes "/>
            </FormContainer>
        </DialogContent>
    </Dialog>
  )
}

export default DialogEdit