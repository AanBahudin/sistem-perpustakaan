import { getAllKondisi } from "@/actions/Pustakawan/pustakawanKondisiActionts"
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
import { useQuery } from "@tanstack/react-query"

const DetailPeminjamanConfirmDialog = ({children} : {children: React.ReactNode}) => {

    const {isLoading, data} = useQuery({
        queryKey: ['kondisi'],
        queryFn: getAllKondisi
    })

    const newData = isLoading ? ['memuat'] : [...data.map((item: any) => item.kondisi)]

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Terima Peminjaman</DialogTitle>
                        <DialogDescription className="text-xs mt-4">Pilih kondisi awal buku sebelum menyetujui peminjaman. Data ini akan dicatat sebagai acuan saat pengembalian.</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1" className="text-sm">Kondisi Buku</Label>
                            <Select>
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
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="text-white">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default DetailPeminjamanConfirmDialog
