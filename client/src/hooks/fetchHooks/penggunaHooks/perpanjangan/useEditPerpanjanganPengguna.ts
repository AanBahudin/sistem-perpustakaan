import { useQueryClient, useMutation } from "@tanstack/react-query"
import { penggunaEditPerpanjangan } from "@/actions/Pengguna/Perpanjangan"
import { store } from "@/store"
import { setAlasan, setDurasi } from "@/cart/peminjamanSlice"
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
            store.dispatch(setAlasan(''))
            store.dispatch(setDurasi(''))
        },
        onError: (error: any) => {
            const errMsg = errorMsgGenerator(error) || 'Tidak dapat mengedit pengajuan perpanjangan'
            toast('Terjadi kesalahan', {description: errMsg})
        }
    })

    const handleSubmit = (event: any) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData) as any
        mutation.mutate(data)
    }

    return {
        mutationFn: handleSubmit,
        isLoading: mutation.isPending

    }

}

export default useEditPerpanjanganPengguna