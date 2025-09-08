import { prodiVerifyUserAccount } from "@/actions/Prodi/ProdiPenggunaActions"
import { setVerifikasiPenggunaAlert } from "@/cart/Prodi/prodiPenggunaSlice"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { store } from "@/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { toast } from "sonner"

const VerifikasiPenggunaAlert = ({dataPengguna} : {dataPengguna: any}) => {
  
  const {_id: idPengguna, nama} = dataPengguna
  const { verifikasiPenggunaAlert} = useSelector((state: any) => state.prodiPenggunaSlice)

  const handleAlertChange = (value: boolean) => {
    store.dispatch(setVerifikasiPenggunaAlert({value, id: idPengguna}))
  }

  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const mutation = useMutation({
    mutationFn: () => prodiVerifyUserAccount(idPengguna),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['semua', 'pengguna', params]})
      toast('Berhasil Diverifikasi', {description: 'Akun Pengguna Berhasil Diverifikasi'})
      handleAlertChange(false)
    },
    onError: (error: any) => {
      const errMsg = error.response.data.message || 'Gagal memperbaharui durasi, Coba lagi nanti'
      toast('Terjadi kesalahan', {description: errMsg})
      handleAlertChange(false)
    }
  })

  const isLoading = mutation.isPending
  const handleMutation = () => {
    mutation.mutate()
  }

  return (
    <AlertDialog open={verifikasiPenggunaAlert} onOpenChange={handleAlertChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Verifikasi Akun {nama}?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin memverifikasi akun pengguna ini? Setelah diverifikasi, pengguna akan mendapatkan akses penuh untuk menggunakan layanan perpustakaan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="text-xs"
            disabled={isLoading}
            >Batal</AlertDialogCancel>
          <Button 
            className="text-xs"
            onClick={handleMutation} disabled={isLoading}
            >{isLoading ? 'Memproses...' : 'Verifikasi'}</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default VerifikasiPenggunaAlert