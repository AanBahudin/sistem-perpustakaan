import { approvePengembalianDataPustakawan } from "@/actions/Pustakawan/pustakawanPengembalianActions"
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
import { Loader } from "lucide-react"
import React from "react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

const ConfirmPengembalianDialog = ({children} : {children: React.ReactNode}) => {

    const {idPengembalian} = useParams()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: () => approvePengembalianDataPustakawan({idPengembalian: idPengembalian as string}),
        onSuccess: () => {
            toast('Data Pengembalian Disetujui')
            queryClient.invalidateQueries({queryKey: ['detail', 'pengembalian', idPengembalian]})
        },
        onError: () => {
            toast('Terjadi Kesalahan', {description: 'Sedang bermasalah, tidak dapat menerima pengembalian.'})
        }
    })

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Setujui Pengembalian</AlertDialogTitle>
                    <AlertDialogDescription>
                        Pastikan mahasiswa/dosen telah menyerahkan buku dan membayar denda kerusakan atau kehilangan jika ada
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction disabled={mutation.isPending} onClick={() => mutation.mutate()} className="text-white">
                        {mutation.isPending ? <Loader className="animate-spin" /> : 'Terima'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmPengembalianDialog