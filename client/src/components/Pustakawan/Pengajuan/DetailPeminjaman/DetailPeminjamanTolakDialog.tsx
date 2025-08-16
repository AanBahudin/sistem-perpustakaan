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
import { useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useState } from "react"

const DetailPeminjamanTolakDialog = ({children, idPeminjaman} : {children: React.ReactNode, idPeminjaman: string}) => {

    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()

    const handleSubmit = async() => {
        setLoading(true)
        await tolakPengajuanPeminjaman({idPeminjaman})
        queryClient.invalidateQueries({queryKey: ['detail', 'peminjaman', idPeminjaman]})
        setLoading(false)
    }

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
                    <AlertDialogAction onClick={handleSubmit} className="text-white bg-destructive hover:bg-destructive/80" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : 'Tolak'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DetailPeminjamanTolakDialog