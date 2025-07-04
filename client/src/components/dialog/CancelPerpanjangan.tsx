import { useState } from "react"
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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { pembatalanPerpanjangan } from "@/actions/perpanjanganActions"
import { useNavigate } from "react-router-dom"
import { store } from "@/store"
import { setAlasan, setDurasi } from "@/cart/peminjamanSlice"


const CancelPerpanjangan = ({perpanjangan} : {perpanjangan: any}) => {

  const {disetujui, _id: idPerpanjangan} = perpanjangan

  const [isModalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleClick = () => {
    setModalOpen(!isModalOpen)
  }

  
  const queryClient = useQueryClient()
  const {mutateAsync: batalPerpanjangan} = useMutation({
    mutationFn: () => pembatalanPerpanjangan({idPerpanjangan}),
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: () => {
      setLoading(false)
      store.dispatch(setAlasan(''))
      store.dispatch(setDurasi(''))
      queryClient.invalidateQueries({queryKey: ['detail-peminjaman', 'perpanjangan', idPerpanjangan]})
      if (window.history.length > 2) {
        navigate(-1);
      } else {
        navigate('/my/data/perpanjangan');
      }
    },
    onError: () => {
      setLoading(false)
    }
  })

  const hapusPengajuanFunc = async() => {
    await batalPerpanjangan()
  }
  
  return (
    <AlertDialog open={isModalOpen} onOpenChange={setModalOpen}>
      <AlertDialogTrigger asChild>
          <Button
            variant='destructive'
            disabled={disetujui !== 'Pending'} 
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
          <AlertDialogCancel onClick={handleClick} className="bg-destructive">Batal</AlertDialogCancel>
          <Button asChild variant='destructive'>
            <AlertDialogAction onClick={hapusPengajuanFunc} className="bg-primary/70 hover:bg-primary text-white">
            {loading ? 'Membatalkan... ' : 'Batalkan pengajuan'}
            </AlertDialogAction>
          </Button>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
  )
}

export default CancelPerpanjangan