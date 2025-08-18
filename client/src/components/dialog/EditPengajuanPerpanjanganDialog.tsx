import React, { useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editPerpanjangan } from "@/actions/perpanjanganActions"
import { Settings2 } from "lucide-react"
import SelectDurasi from "@/pages/pengguna/Buku/SelectDurasi"
import AlasanInput from "@/pages/pengguna/Buku/AlasanInput"
import { store } from "@/store"
import { setAlasan, setDurasi } from "@/cart/peminjamanSlice"
import { Button } from "../ui/button"

type EditPengajuanPerpanjanganDialogType = {
    children: React.ReactNode,
    perpanjangan: any
}

const EditPengajuanPerpanjanganDialog = ({children, perpanjangan} : EditPengajuanPerpanjanganDialogType) => {

    const { durasi, alasan, _id: idPerpanjangan } = perpanjangan

    const queryClient = useQueryClient()
    const {mutateAsync: editPerpanjanganData} = useMutation({
        mutationFn: (formData: any) =>
            editPerpanjangan({ idPerpanjangan, data: {...formData} 
        }),
        onMutate: () => {
            setLoading(true)
        },
        onSuccess: () => {
            setLoading(false)
            queryClient.invalidateQueries({queryKey: ['detail-perpanjangan', idPerpanjangan]})
            setModalOpen(false)
            store.dispatch(setAlasan(''))
            store.dispatch(setDurasi(''))
        },
        onError: () => {
            setLoading(false)
        }
    })

    const [isModalOpen, setModalOpen] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const handleSubmit = async(event: any) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData) as any
        await editPerpanjanganData(data)
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
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