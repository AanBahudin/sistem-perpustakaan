import React, { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editPerpanjangan } from "@/actions/perpanjanganActions"
import { Settings2 } from "lucide-react"
import SelectDurasi from "@/pages/pengguna/Buku/SelectDurasi"
import AlasanInput from "@/pages/pengguna/Buku/AlasanInput"
import { store } from "@/store"
import { setAlasan, setDurasi } from "@/cart/peminjamanSlice"

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
        const data = Object.fromEntries(formData) as {
            durasi: string
            alasan: string
        }
        await editPerpanjanganData(data)
    }

    return (
        <AlertDialog open={isModalOpen} onOpenChange={setModalOpen}>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>

            <AlertDialogContent className="w-full">
                <form onSubmit={handleSubmit} className="w-full">
                    <section className="flex flex-col items-start justify-start">
                        <main className='w-10 h-10 p-[10px] flex items-center justify-center rounded-full bg-primary/10'>
                            <Settings2 className='stroke-primary' />
                        </main>

                        <AlertDialogTitle className="text-center capitalize text-lg my-2">Edit Data Pengajuan Perpanjangan</AlertDialogTitle>
                        <AlertDialogDescription className="text-xs mb-4">Silakan perbarui informasi pengajuan perpanjangan Anda. Pastikan data yang dimasukkan sudah benar sebelum menyimpan perubahan.</AlertDialogDescription>

                        <main className="w-full flex flex-col gap-y-4">
                            <SelectDurasi defaultDurasi={durasi} />
                            <AlasanInput defaultAlasan={alasan} />
                        </main>
                    </section>


                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction type="submit" className="text-white" disabled={isLoading}>{isLoading ? 'Proses...' : 'Perbaharui'}</AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default EditPengajuanPerpanjanganDialog