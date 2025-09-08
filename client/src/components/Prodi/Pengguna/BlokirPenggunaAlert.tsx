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
import { useSearchParams } from "react-router-dom"
import { toast } from "sonner"

const BlokirPenggunaAlert = ({dataPengguna} : {dataPengguna: any}) => {

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
            queryClient.invalidateQueries({queryKey: ['semua', 'pengguna', params]})
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
                    <AlertDialogCancel disabled={isLoading} onClick={(e) => {
                        e.stopPropagation()
                        handleOpenAlert(false)
                    }}>Batal</AlertDialogCancel>
                    <Button disabled={isLoading} onClick={handleMutate} className="bg-destructive hover:bg-destructive/70">
                        {isLoading ? 'Sedang Proses...' : 'Blokir'}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default BlokirPenggunaAlert