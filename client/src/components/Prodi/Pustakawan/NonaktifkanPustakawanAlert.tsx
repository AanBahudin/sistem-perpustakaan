import { prodiNonaktifPustakawanAction } from "@/actions/Prodi/Pustakawan"
import { setNonaktifAlert } from "@/cart/Prodi/prodiPustakawanSlice"
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

const NonaktifkanPustakawanAlert = ({idPustakawan} : {idPustakawan: string}) => {

    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const params = new URLSearchParams(searchParams).toString()
    
    const { activePustakawanId, nonaktifAlert } = useSelector((state: any) => state.prodiPustakawanSlice)
    const handleOpenAlert = (value: boolean) => {
        store.dispatch(setNonaktifAlert({pustakawanId: idPustakawan, alertState: value}))
    }

    const mutation = useMutation({
        mutationFn: () => prodiNonaktifPustakawanAction(activePustakawanId),
        onSuccess: () => {
            toast('Akun pustakawan dinonaktifkan')
            queryClient.invalidateQueries({queryKey: ['semua', 'pustakawan', params]})
            handleOpenAlert(false)
        },
        onError: (error: any) => {
            const errMsg = error.response.data.message || 'Gagal menonaktifkan akun, Coba lagi nanti'
            toast('Terjadi kesalahan', {description: errMsg})
        }
    })

    const handleMutate = async() => {
        mutation.mutate()
    }

    return (
        <AlertDialog open={nonaktifAlert} onOpenChange={handleOpenAlert}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Nonaktifkan Akun Pustakawan?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Apakah Anda yakin ingin menonaktifkan akun pustakawan ini? Setelah dinonaktifkan, pustakawan tidak dapat lagi mengakses sistem perpustakaan hingga akun diaktifkan kembali oleh admin.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={mutation.isPending}>Batal</AlertDialogCancel>
                    <Button disabled={mutation.isPending} onClick={handleMutate} variant='destructive' className="flex items-center justify-center gap-x-2">
                        {mutation.isPending && <Loader className="animate-spin" />}
                        {mutation.isPending ? 'Menonaktifkan' : 'Nonaktifkan'}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default NonaktifkanPustakawanAlert