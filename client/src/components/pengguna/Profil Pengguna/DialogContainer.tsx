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
import {store} from '@/store'
import { setEdit } from "@/cart/profileSlice"
import { useSelector } from "react-redux"
import {KelasDialog, NoHpDialog, NamaDialog, EmailDialog, PasswordDialog} from "./DialogBox"


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

            {tipe === 'nama' && <NamaDialog />}
            {tipe === 'no_hp' && <NoHpDialog />}
            {tipe === 'kelas' && <KelasDialog />}
            {tipe === 'email' && <EmailDialog />}
            {tipe === 'password' && <PasswordDialog />}

        </DialogContent>
    </Dialog>
  )
}

export default DialogEdit