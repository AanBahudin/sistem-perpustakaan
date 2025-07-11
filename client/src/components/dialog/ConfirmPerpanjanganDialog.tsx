import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { store } from '@/store'
import { setAlasan, setDurasi } from '@/cart/peminjamanSlice'
import { tambahPerpanjangan } from '@/actions/perpanjanganActions'
import {PackagePlus} from 'lucide-react'

const ConfirmPerpanjanganDialog = ({peminjaman} : {peminjaman: any}) => {
    
    const { _id: idPeminjaman, buku } = peminjaman
    const {_id: idBuku} = buku
    const {alasan, durasi} = useSelector((state: any) => state.peminjamanState)

    const [isModalOpen, setIsModalOpen]= useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const queryClient = useQueryClient()

    const {mutateAsync: tambahPinjaman} = useMutation({
        mutationFn: () => tambahPerpanjangan({idPeminjaman, idBuku, durasi, alasan}),
        onMutate: () => {
            setLoading(true)
            setIsModalOpen(true)
        },
        onSuccess: () => {
            setLoading(false)
            setIsModalOpen(false)
            queryClient.invalidateQueries({queryKey: ['peminjaman', idPeminjaman]})
            queryClient.invalidateQueries({queryKey: ['perpanjangan', 'peminjamnan', idPeminjaman]})
            queryClient.invalidateQueries({ queryKey: ['stats', 'pengguna']})
        },
        onError: () => {
            setLoading(false)
            setIsModalOpen(false)
        }
    })
    
    const handleClick = async() => {
        await tambahPinjaman()
        store.dispatch(setAlasan(''))
        store.dispatch(setDurasi(''))
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
                <main className='w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-primary/10'>
                    <PackagePlus className='stroke-primary' />
                </main>
                <AlertDialogTitle className='text-center capitalize text-xl'>Apakah Anda yakin ingin memperpanjang masa peminjaman buku ini?</AlertDialogTitle>
                <AlertDialogDescription className='my-2'>Anda akan memperpanjang masa peminjaman buku ini. Tanggal jatuh tempo akan diperpanjang sesuai kebijakan sistem. Pastikan buku belum melewati batas waktu peminjaman dan tidak sedang dipesan oleh pengguna lain.</AlertDialogDescription>

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

export default ConfirmPerpanjanganDialog