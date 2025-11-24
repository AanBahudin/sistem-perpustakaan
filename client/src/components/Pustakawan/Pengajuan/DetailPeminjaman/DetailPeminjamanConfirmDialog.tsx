import getAllKondisi from "@/actions/Shared/Kondisi/getAllKondisiBuku"
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { terimaPengajuanPeminjaman } from "@/actions/Pustakawan/Peminjaman/pustakawanPengajuanActions"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const DetailPeminjamanConfirmDialog = ({children, idPeminjaman} : {children: React.ReactNode, idPeminjaman: string}) => {

    const queryClient = useQueryClient()
    const [kondisiBuku, setKondisiBuku] = useState('')
    const {isLoading, data} = useQuery({
        queryKey: ['kondisi'],
        queryFn: getAllKondisi
    })

    const newData = isLoading ? ['memuat'] : [...data.map((item: any) => item.kondisi)]

    const mutation = useMutation({
        mutationFn: (payload: { idPeminjaman: string; kondisiBuku: string }) => terimaPengajuanPeminjaman({ data: payload }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["detail", "peminjaman", idPeminjaman]})
            toast('Peminjaman Berhasil Diterima!')
        },
        onError: () => {
            toast('Gagal menerima peminjaman!')
        }
    })

    const handleSubmit = () => {
        mutation.mutate({idPeminjaman, kondisiBuku})
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Terima Peminjaman?</DialogTitle>
                    <DialogDescription className="text-xs mt-4">Pilih kondisi awal buku sebelum menyetujui peminjaman. Informasi ini akan dicatat sebagai acuan saat pengembalian untuk memastikan kondisi buku tetap terjaga</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                    <div className="grid gap-1">
                        <Label htmlFor="name-1" className="text-xs">Kondisi Buku</Label>
                        <input type="hidden" name="idPeminjaman" id="idPeminjaman" value={idPeminjaman} />
                        <Select required value={kondisiBuku} onValueChange={(value: string) => setKondisiBuku(value)} name="kondisiBuku">
                            <SelectTrigger className="w-full !text-xs">
                                <SelectValue placeholder="Kondisi Awal Buku"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup className="!text-xs">
                                    <SelectLabel>Pilih Kondisi</SelectLabel>
                                        {newData.map((item: any, index: number) => {
                                            return (
                                                <SelectItem className="!text-xs" value={item} key={index}>{item}</SelectItem>
                                            )
                                        })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                
                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button variant="outline" className="text-xs" disabled={mutation.isPending}>Batal</Button>
                    </DialogClose>
                    <Button type="submit" className="text-white text-xs" disabled={mutation.isPending || !kondisiBuku} onClick={handleSubmit}>
                        {mutation.isPending ? <Loader2 className="animate-spin" /> : "Terima"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DetailPeminjamanConfirmDialog
