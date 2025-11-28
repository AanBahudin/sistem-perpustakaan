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
import usePembatalanPengajuanPeminjamanPengguna from "@/hooks/fetchHooks/penggunaHooks/peminjaman/usePembatalanPengajuanPeminjamanPengguna"
import { useState } from "react"

type CancelPeminjamanBukuDialogType = {
    children: React.ReactNode,
    idPeminjaman: string,
    idBuku: string
}

const CancelPeminjamanBukuDialog = ({children, idPeminjaman, idBuku} : CancelPeminjamanBukuDialogType) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isLoading, mutateFn} = usePembatalanPengajuanPeminjamanPengguna({idBuku, idPeminjaman})

  return (
     <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertDialogTrigger asChild >{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin membatalkan pengajuan ini?</AlertDialogTitle>
          <AlertDialogDescription>
            Kami akan membatalkan peminjaman buku ini dari akun Anda. Jika ini tidak disengaja, Anda masih bisa membatalkan proses ini.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Tidak</AlertDialogCancel>
          <AlertDialogAction onClick={mutateFn} className="bg-destructive/70 hover:bg-destructive text-white">
            {isLoading ? 'Membatalkan...' : 'Batalkan'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CancelPeminjamanBukuDialog