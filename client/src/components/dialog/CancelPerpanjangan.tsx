import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AlertCircleIcon } from "lucide-react"
import { Button } from "../ui/button"
import useCancelPerpanjanganPengguna from "@/hooks/fetchHooks/penggunaHooks/perpanjangan/useCancelPerpanjanganPengguna"


const CancelPerpanjangan = ({perpanjangan} : {perpanjangan: any}) => {

  const {disetujui, _id: idPerpanjangan} = perpanjangan
  const { 
    isLoading, isModalOpen, 
    setModalOpen, mutationFn } = useCancelPerpanjanganPengguna({idPerpanjangan})
  
  return (
    <AlertDialog open={isModalOpen} onOpenChange={setModalOpen}>
      <AlertDialogTrigger asChild>
          <Button
            variant='destructive' disabled={disetujui !== 'Pending'} 
            className="text-white w-full disabled:cursor-not-allowed">
              Batalkan Perpanjangan
          </Button>
      </AlertDialogTrigger>
        
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <main className='w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-destructive/10'>
              <AlertCircleIcon className='stroke-destructive' />
          </main>
          <AlertDialogTitle className='text-center capitalize text-xl'>Batalkan Perpanjangan Buku</AlertDialogTitle>
          <AlertDialogDescription className='my-2'>Apakah Anda yakin ingin membatalkan perpanjangan buku ini? Tindakan ini akan mengembalikan status peminjaman ke semula dan tanggal pengembalian tidak akan diperpanjang.</AlertDialogDescription>
        </AlertDialogHeader>


        <AlertDialogFooter>
          <AlertDialogCancel className="bg-destructive">Batal</AlertDialogCancel>
          <Button asChild variant='destructive'>
            <AlertDialogAction onClick={mutationFn} className="bg-primary/70 hover:bg-primary text-white">
            {isLoading ? 'Membatalkan... ' : 'Batalkan pengajuan'}
            </AlertDialogAction>
          </Button>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
  )
}

export default CancelPerpanjangan