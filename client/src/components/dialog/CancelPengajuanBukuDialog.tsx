import { pembatalanPeminjamanBuku } from "@/actions/peminjamanActions"
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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"

type CancelPengajuanBukuDialogType = {
    children: React.ReactNode,
    idPeminjaman: string,
    idBuku: string
}

const CancelPengajuanBukuDialog = ({children, idPeminjaman, idBuku} : CancelPengajuanBukuDialogType) => {

  const {pathname} = useLocation()
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const {mutateAsync: cancelPeminjaman} = useMutation({
    mutationFn: () => pembatalanPeminjamanBuku({idPeminjaman: idPeminjaman, idBuku: idBuku}),
    onMutate: () => {
      setLoading(true)
      setIsModalOpen(true)
    },
    onSuccess: () => {
      setLoading(false)
      setIsModalOpen(false)
      queryClient.invalidateQueries({queryKey: ['detail-peminjaman', idBuku]})
      toast('Peminjaman Dibatalkan')
      if (pathname.includes('peminjaman')) {
        navigate('/my/data/peminjaman')
      }
    },
    onError: () => {
      setLoading(false)
      setIsModalOpen(false)
    }
  })


  const handleClick = async() => {
    await cancelPeminjaman()
    setIsModalOpen(false)
  }

  return (
     <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertDialogTrigger asChild >
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin membatalkan pengajuan ini?</AlertDialogTitle>
          <AlertDialogDescription>
            Kami akan membatalkan peminjaman buku ini dari akun Anda. Jika ini tidak disengaja, Anda masih bisa membatalkan proses ini.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Tidak</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick} className="bg-destructive/70 hover:bg-destructive text-white">
            {loading ? 'Membatalkan...' : 'Batalkan'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CancelPengajuanBukuDialog