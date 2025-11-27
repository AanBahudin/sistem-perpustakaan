import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { BookOpenCheck } from 'lucide-react'
import { Button } from '../ui/button'
import useConfirmPeminjamanPengguna from '@/hooks/fetchHooks/penggunaHooks/peminjaman/useConfirmPeminjamanPengguna'
import { useState } from "react"
import { useSelector } from "react-redux"

type ConfirmPeminjamanType = {
    buku: any
}

const ConfirmPeminjaman = ({buku} : ConfirmPeminjamanType) => {

    const {alasan, durasi} = useSelector((state: any) => state.peminjamanState)
    const [isModalOpen, setIsModalOpen]= useState<boolean>(false)
    const {mutationFn, isLoading} = useConfirmPeminjamanPengguna({idBuku: buku._id, alasan, durasi})

    return (
        <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    disabled={durasi === '' || alasan.length < 15 || alasan === ''} 
                    className="text-white w-full mt-6 disabled:cursor-not-allowed" size='sm'>
                        Ajukkan
                </Button>
            </AlertDialogTrigger>
        
            <AlertDialogContent>
                <AlertDialogHeader>
                    <main className='w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-primary/10'>
                        <BookOpenCheck className='stroke-primary' />
                    </main>
                    <AlertDialogTitle className='text-center capitalize text-2xl'>Konfirmasi peminjaman Anda</AlertDialogTitle>
                    <AlertDialogDescription className='text-justify my-5'>Anda akan mengajukan permintaan peminjaman buku berdasarkan data yang telah diisi. Pastikan seluruh informasi sudah benar. Setelah dikirim, pengajuan ini akan diproses oleh pihak perpustakaan sesuai kebijakan yang berlaku.</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={mutationFn} className="bg-primary/70 hover:bg-primary text-white">
                    {isLoading ? 'Mengajukkan... ' : 'Terima'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmPeminjaman