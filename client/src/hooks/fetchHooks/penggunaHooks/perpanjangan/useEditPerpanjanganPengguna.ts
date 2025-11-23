import { useQueryClient, useMutation } from "@tanstack/react-query"
import { penggunaEditPerpanjangan } from "@/actions/Pengguna/Perpanjangan"
import { store } from "@/store"
import { setAlasan, setDurasi } from "@/cart/peminjamanSlice"
import { useState } from "react"
import { errorMsgGenerator } from "@/utils/errorMsgFunc"
import { toast } from "sonner"

type HooksProps = {
    idPerpanjangan: string
}

const useEditPerpanjanganPengguna = ({idPerpanjangan} : HooksProps) => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (formData: any) =>
            penggunaEditPerpanjangan({ idPerpanjangan, data: {...formData} 
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['detail-perpanjangan', idPerpanjangan]})
            setModalOpen(false)
            store.dispatch(setAlasan(''))
            store.dispatch(setDurasi(''))
        },
        onError: (error: any) => {
            const errMsg = errorMsgGenerator(error) || 'Tidak dapat mengedit pengajuan perpanjangan'
            toast('Terjadi kesalahan', {description: errMsg})
        }
    })

    const [isModalOpen, setModalOpen] = useState(false)

    const handleSubmit = async(event: any) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData) as any
        await mutation.mutate(data)
    }

    return {
        mutationFn: handleSubmit,
        isLoading: mutation.isPending,
        isModalOpen, setModalOpen

    }

}

export default useEditPerpanjanganPengguna