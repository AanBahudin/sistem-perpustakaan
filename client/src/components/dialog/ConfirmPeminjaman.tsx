import { useState } from 'react'
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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { tambahPinjamanNew } from '@/actions/peminjamanActions'
import { useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { store } from '@/store'
import { setAlasan, setDurasi } from '@/cart/peminjamanSlice'

type ConfirmPeminjamanType = {
    buku: any
}

const ConfirmPeminjaman = ({buku} : ConfirmPeminjamanType) => {

    console.log(buku)

    const {alasan, durasi} = useSelector((state: any) => state.peminjamanState)
    const [isModalOpen, setIsModalOpen]= useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const {mutateAsync: tambahPinjaman} = useMutation({
        mutationFn: () => tambahPinjamanNew({idBuku: buku._id, alasan, durasi}),
        onMutate: () => {
            setLoading(true)
            setIsModalOpen(true)
        },
        onSuccess: () => {
            setLoading(false)
            setIsModalOpen(false)
            queryClient.invalidateQueries({queryKey: ['confirm', 'peminjaman', buku._id]})
            queryClient.invalidateQueries({queryKey: ['confirm', 'pinjaman', buku._id]})
            queryClient.invalidateQueries({ queryKey: ['stats', 'pengguna']})
            store.dispatch(setAlasan(''))
            store.dispatch(setDurasi(''))
        },
        onError: (error: any) => {
            console.log(error)
            setLoading(false)
            setIsModalOpen(false)
        }
    })

    const handleClick = async() => {
        await tambahPinjaman()
        setIsModalOpen(false)
    }

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
                    <AlertDialogAction onClick={handleClick} className="bg-primary/70 hover:bg-primary text-white">
                    {loading ? 'Mengajukkan... ' : 'Terima'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmPeminjaman