import { prodiAktifkan } from "@/actions/Prodi/ProdiPustakawanActions"
import { setAktifAlert } from "@/cart/Prodi/prodiPustakawanSlice"
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
import { Loader } from "lucide-react"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { toast } from "sonner"

const AktifkanPustakawanAlert = ({idPustakawan} : {idPustakawan: string}) => {

    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const params = new URLSearchParams(searchParams).toString()

    const { activePustakawanId, aktifkanAlert } = useSelector((state: any) => state.prodiPustakawanSlice)
    const handleOpenAlert = (value: boolean) => {
        store.dispatch(setAktifAlert({pustakawanId: idPustakawan, alertState: value}))
    }

    const mutation = useMutation({
        mutationFn: () => prodiAktifkan(activePustakawanId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['semua', 'pustakawan', params]})
            toast('Akun pustakawan Diaktifkan')
            handleOpenAlert(false)
        },
        onError: (error: any) => {
            const errMsg = error.response.data.message || 'Gagal mengaktifkan akun, Coba lagi nanti'
            toast('Terjadi kesalahan', {description: errMsg})
        }
    })

    const handleMutate = async() => {
        mutation.mutate()
    }

    return (
        <AlertDialog open={aktifkanAlert} onOpenChange={handleOpenAlert}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Aktifkan Akun Pustakawan?</AlertDialogTitle>   
                    <AlertDialogDescription>
                        Apakah Anda yakin ingin mengaktifkan kembali akun pustakawan ini? Akun yang diaktifkan ulang akan dapat digunakan kembali untuk mengakses sistem perpustakaan.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={mutation.isPending}>Batal</AlertDialogCancel>
                    <Button disabled={mutation.isPending} onClick={handleMutate} variant='default' className="flex items-center justify-center gap-x-2">
                        {mutation.isPending && <Loader className="animate-spin" />}
                        {mutation.isPending ? 'Menaktifkan...' : 'Aktifkan'}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AktifkanPustakawanAlert