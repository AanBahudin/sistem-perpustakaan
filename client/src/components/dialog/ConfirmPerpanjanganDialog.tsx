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
import { Button } from '../ui/button'
import {PackagePlus} from 'lucide-react'
import useConfirmPerpanjanganPengguna from '@/hooks/fetchHooks/penggunaHooks/perpanjangan/useConfirmPerpanjanganPengguna'

const ConfirmPerpanjanganDialog = ({peminjaman} : {peminjaman: any}) => {

    const { _id: idPeminjaman, buku } = peminjaman
    const {_id: idBuku} = buku
    const { isLoading, isModalOpen, setIsModalOpen, durasi, alasan, mutationFn } = useConfirmPerpanjanganPengguna({idBuku, idPeminjaman})

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
                    <AlertDialogAction onClick={mutationFn} className="bg-primary/70 hover:bg-primary text-white">
                    {isLoading ? 'Mengajukkan... ' : 'Terima'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmPerpanjanganDialog