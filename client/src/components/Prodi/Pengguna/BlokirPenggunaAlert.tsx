import { prodiBlockedUser } from "@/actions/Prodi/ProdiPenggunaActions"
import { setBlokirPenggunaAlert } from "@/cart/Prodi/prodiPenggunaSlice"
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
import { useLocation, useSearchParams } from "react-router-dom"
import { toast } from "sonner"

const BlokirPenggunaAlert = ({dataPengguna} : {dataPengguna: any}) => {

    const {pathname} = useLocation()
    const {nama, _id: idPengguna} = dataPengguna

    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const params = new URLSearchParams(searchParams).toString() 

    const { blokirPenggunaAlert } = useSelector((state: any) => state.prodiPenggunaSlice)
    const handleOpenAlert = (value: boolean) => {
        store.dispatch(setBlokirPenggunaAlert(value))
    }

    const mutation = useMutation({
        mutationFn: () => prodiBlockedUser(idPengguna),
        onSuccess: () => {

            if (pathname.includes('dosen')) queryClient.invalidateQueries({queryKey: ['semua', 'dosen', params]})
            else if (pathname.includes('mahasiswa')) queryClient.invalidateQueries({queryKey: ['semua', 'mahasiswa', params]})
            else if (pathname.includes('permintaan')) queryClient.invalidateQueries({queryKey: ['pengajuan', 'pengguna', params]})
            else if (pathname.includes('blokir')) queryClient.invalidateQueries({queryKey: ['semua', 'blokir', params]})
            else queryClient.invalidateQueries({queryKey: ['semua', 'pengguna', params]})
            
            toast('Akun Pengguna Berhasil Diblokir')
            handleOpenAlert(false)
        },
        onError: (error: any) => {
            const errMsg = error.response.data.message || 'Gagal memperbaharui durasi, Coba lagi nanti'
            toast('Terjadi kesalahan', {description: errMsg})
            handleOpenAlert(false)
        }
    })

    const handleMutate = async() => {
        mutation.mutate()
    }

    const isLoading = mutation.isPending

    return (
        <AlertDialog defaultOpen={blokirPenggunaAlert} onOpenChange={handleOpenAlert}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Yakin memblokir {nama}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Setelah diblokir, pengguna tidak dapat mengakses akun maupun layanan yang tersedia hingga status blokir dicabut oleh admin.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel className="text-xs" disabled={isLoading}>Batal</AlertDialogCancel>
                    <Button disabled={isLoading} onClick={handleMutate} className="bg-destructive text-xs hover:bg-destructive/70">
                        {isLoading ? 'Sedang Proses...' : 'Blokir Pengguna'}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default BlokirPenggunaAlert