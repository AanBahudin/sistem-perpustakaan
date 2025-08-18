import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { terimaPengajuanPerpanjanganPustakawan } from "@/actions/Pustakawan/pustakawanPerpanjanganActions"

type DetailPerpanjanganConfirmDialogType = {
    children: React.ReactNode,
    idPerpanjangan: string
}

const DetailPerpanjanganConfirmDialog = ({children, idPerpanjangan} : DetailPerpanjanganConfirmDialogType) => {

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: ({idPerpanjangan} : {idPerpanjangan: string}) => terimaPengajuanPerpanjanganPustakawan({ idPerpanjangan }),
        onSuccess: () => {
            toast('Perpanjangan Berhasil Diterima!')
            queryClient.invalidateQueries({queryKey: ["detail", "peminjaman", idPerpanjangan]})
        },
        onError: () => {
            toast('Gagal menerima perpanjangan!')
        }
    })

    const handleSubmit = () => {
        mutation.mutate({idPerpanjangan})
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Terima Perpanjangan?</DialogTitle>
                    <DialogDescription className="text-xs mt-4">Pilih kondisi awal buku sebelum menyetujui peminjaman. Informasi ini akan dicatat sebagai acuan saat pengembalian untuk memastikan kondisi buku tetap terjaga</DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button variant="outline" className="text-xs" disabled={mutation.isPending}>Batal</Button>
                    </DialogClose>
                    <Button type="submit" className="text-white text-xs" disabled={mutation.isPending} onClick={handleSubmit}>
                        {mutation.isPending ? <Loader2 className="animate-spin" /> : "Terima"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DetailPerpanjanganConfirmDialog