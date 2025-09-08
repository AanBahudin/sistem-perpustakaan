import { prodiUnblockedUser } from "@/actions/Prodi/ProdiPenggunaActions"
import { setBukuBlokirPenggunaAlert } from "@/cart/Prodi/prodiPenggunaSlice"
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

const BukaBlokirPenggunaAlert = ({dataPengguna} : {dataPengguna: any}) => {

    const {nama, _id: idPengguna} = dataPengguna

    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const params = new URLSearchParams(searchParams).toString() 

    const { bukaBlokirPenggunaAlert } = useSelector((state: any) => state.prodiPenggunaSlice)
    const handleOpenAlert = (value: boolean) => {
        store.dispatch(setBukuBlokirPenggunaAlert({value, id: idPengguna}))
    }

    const mutation = useMutation({
        mutationFn: () => prodiUnblockedUser(idPengguna),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['semua', 'pengguna', params]})
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
        <AlertDialog defaultOpen={bukaBlokirPenggunaAlert} onOpenChange={handleOpenAlert}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Yakin membuka blokir {nama}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Apakah Anda yakin ingin membuka blokir pengguna ini? Setelah dibuka, pengguna akan mendapatkan kembali akses penuh ke akun dan layanan yang tersedia.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading} onClick={(e) => {
                        e.stopPropagation()
                        handleOpenAlert(false)
                    }}>Batal</AlertDialogCancel>
                    <Button disabled={isLoading} onClick={handleMutate} className="bg-primary hover:bg-primary/70">
                        {isLoading ? 'Sedang Proses...' : 'Buka Blokir'}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default BukaBlokirPenggunaAlert