import { setAlasan, setDurasi } from "@/cart/peminjamanSlice"
import { store } from "@/store"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { penggunaTambahPerpanjangan } from "@/actions/Pengguna/Perpanjangan"
import { errorMsgGenerator } from "@/utils/errorMsgFunc"
import { toast } from "sonner"

type HooksProps = {
    idPeminjaman: string,
    idBuku: string,
    durasi: number,
    alasan: string
}

const useConfirmPerpanjanganPengguna = ({ idPeminjaman, idBuku, alasan, durasi } : HooksProps) => {
    
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: () => penggunaTambahPerpanjangan({idPeminjaman, idBuku, durasi, alasan}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['peminjaman', idPeminjaman]})
            queryClient.invalidateQueries({queryKey: ['perpanjangan', 'peminjamnan', idPeminjaman]})
            queryClient.invalidateQueries({ queryKey: ['stats', 'pengguna']})
        },
        onError: (error: any) => {
            const errMsg = errorMsgGenerator(error) || 'Terjadi kesalahan saat mengajukan perpanjangan'
            toast('Terjadi kesalahan', {description: errMsg})
        }
    })
    
    const handleClick = () => {
        mutation.mutate()
        store.dispatch(setAlasan(''))
        store.dispatch(setDurasi(''))
    }

    return {
        isLoading: mutation.isPending,
        mutationFn: handleClick,    }
}

export default useConfirmPerpanjanganPengguna