import { tolakPengajuanPeminjaman } from "@/actions/Pustakawan/pustakawanPengajuanActions"
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
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

const DetailPeminjamanTolakDialog = ({children, idPeminjaman} : {children: React.ReactNode, idPeminjaman: string}) => {

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: () => tolakPengajuanPeminjaman({idPeminjaman}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['detail', 'peminjaman', idPeminjaman]})
        },
        onError: () => {
            toast('Terjadi Gangguan', {description: 'Tidak dapat memperbaharui pengajan, Silahkan coba lagi'})
        }
    })

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Anda yakin menolak pengajuan ini?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Keputusan ini akan menginformasikan pengguna bahwa permintaan peminjaman tidak dapat diproses
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batalkan</AlertDialogCancel>
                    <AlertDialogAction onClick={() => mutation.mutate()} className="text-white bg-destructive hover:bg-destructive/80" disabled={mutation.isPending}>
                        {mutation.isPending ? <Loader2 className="animate-spin" /> : 'Tolak'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DetailPeminjamanTolakDialog