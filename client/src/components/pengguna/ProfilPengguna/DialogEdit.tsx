import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {store} from '@/store'
import { setEdit } from "@/cart/profileSlice"
import { useSelector } from "react-redux"


const DialogEdit = ({isEditable, name} : {isEditable: boolean, name?: string}) => {

  const {tipe} = useSelector((state:any) =>state.profileState)
  

  return (
    <Dialog>
        <DialogTrigger asChild className={`${isEditable ? 'block' : 'hidden'}`}>
            <Button onClick={() => store.dispatch(setEdit(name))} variant='default'><Pencil className='stroke-primary-foreground dark:stroke-white' /></Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle className="capitalize">Perbaharui {tipe}</DialogTitle>
            <DialogDescription>
                Make changes to your profile here. Click save when you're done.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                Name
                </Label>
                <Input id="name" className="col-span-3 selection:text-white" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                Username
                </Label>
                <Input id="username" className="col-span-3 selection:text-white" />
            </div>
            </div>
            <DialogFooter>
            <Button type="submit" className='text-white'>Save changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default DialogEdit