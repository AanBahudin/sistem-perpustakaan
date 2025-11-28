import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Settings2 } from "lucide-react"
import SelectDurasi from "@/components/pengguna/Konfirmasi Peminjaman/SelectDurasi"
import AlasanInput from "@/components/pengguna/Konfirmasi Peminjaman/AlasanInput"
import { Button } from "../ui/button"
import useEditPerpanjanganPengguna from "@/hooks/fetchHooks/penggunaHooks/perpanjangan/useEditPerpanjanganPengguna"
import { useState } from "react"

type EditPengajuanPerpanjanganDialogType = {
    children: React.ReactNode,
    perpanjangan: any
}

const EditPengajuanPerpanjanganDialog = ({children, perpanjangan} : EditPengajuanPerpanjanganDialogType) => {

    const [isModalOpen, setModalOpen] = useState(false)
    const { durasi, alasan, _id: idPerpanjangan } = perpanjangan
    const { isLoading, mutationFn } = useEditPerpanjanganPengguna({idPerpanjangan})

    return (
        <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={mutationFn}>
                    <section className="flex flex-col items-start justify-start">
                        <main className='w-10 h-10 p-[10px] flex items-center justify-center rounded-full bg-primary/10'>
                            <Settings2 className='stroke-primary' />
                        </main>

                        <DialogTitle className="text-center capitalize text-lg my-2">Edit Data Pengajuan Perpanjangan</DialogTitle>
                        <DialogDescription className="text-xs mb-4">Silakan perbarui informasi pengajuan perpanjangan Anda. Pastikan data yang dimasukkan sudah benar sebelum menyimpan perubahan.</DialogDescription>

                        <main className="w-full flex flex-col gap-y-4">
                            <SelectDurasi defaultDurasi={durasi} />
                            <AlasanInput defaultAlasan={alasan} />
                        </main>
                    </section>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" className="text-xs text-white">Batal</Button>
                        </DialogClose>
                        <Button type="submit" className="text-xs text-white" disabled={isLoading}>{isLoading ? 'Proses...' : 'Perbaharui'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditPengajuanPerpanjanganDialog