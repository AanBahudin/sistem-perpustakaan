import { tolakPerpanjanganPustakawan } from "@/actions/Pustakawan/pustakawanPerpanjanganActions"
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

type DetailPerpanjanganTolakDialogType = {
    idPerpanjangan: string,
    children: React.ReactNode
}

const DetailPerpanjanganTolakDialog = ({idPerpanjangan, children} : DetailPerpanjanganTolakDialogType) => {

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: () => tolakPerpanjanganPustakawan(idPerpanjangan),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['detail', 'perpanjangan', idPerpanjangan]})
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
                        Keputusan ini akan menginformasikan pengguna bahwa permintaan perpanjangan tidak dapat diproses
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

export default DetailPerpanjanganTolakDialog