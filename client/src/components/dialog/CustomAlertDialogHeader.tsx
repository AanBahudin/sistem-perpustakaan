import {
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { BookOpenCheck } from 'lucide-react'

type CustomAlertDialogHeaderType = {
    title?: string,
    desc?: string
}

const CustomAlertDialogHeader = ({title= 'Konfirmasi Perpanjangan Anda', desc} : CustomAlertDialogHeaderType) => {
  return (
    <AlertDialogHeader>
        <main className='w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-primary/10'>
            <BookOpenCheck className='stroke-primary' />
        </main>
        <AlertDialogTitle className='text-center capitalize text-2xl'>{title}</AlertDialogTitle>
        <AlertDialogDescription className='text-justify my-5'>{desc}</AlertDialogDescription>
    </AlertDialogHeader>
  )
}

export default CustomAlertDialogHeader