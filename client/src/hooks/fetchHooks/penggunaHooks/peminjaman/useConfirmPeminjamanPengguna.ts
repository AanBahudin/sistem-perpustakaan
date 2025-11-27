import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { tambahPeminjamanPengguna } from "@/actions/Pengguna/Peminjaman"
import { setAlasan, setDurasi } from "@/cart/peminjamanSlice"
import { store } from "@/store"
import { toast } from "sonner"

type HooksProps = {
    idBuku: string,
    alasan: string,
    durasi: number
}

const useConfirmPeminjamanPengguna = ({idBuku, alasan, durasi} : HooksProps) => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: () => tambahPeminjamanPengguna({idBuku, alasan, durasi}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['confirm', 'peminjaman', idBuku]})
            queryClient.invalidateQueries({queryKey: ['confirm', 'pinjaman', idBuku]})
            queryClient.invalidateQueries({ queryKey: ['stats', 'pengguna']})
            store.dispatch(setAlasan(''))
            store.dispatch(setDurasi(''))
            toast('Berhasil Di Ajukan!', {description: 'Silahkan cek peminjaman anda pada menu Peminjaman'})
        },
        onError: (error: any) => {
            const errMsg = error.response.data.message || 'Gagal memperbaharui durasi, Coba lagi nanti'
            toast('Terjadi kesalahan', {description: errMsg})
        }
    })

    const handleClick = () => {
        mutation.mutate()
    }

    return {
        mutationFn: handleClick,
        isLoading: mutation.isPending,
    }
}

export default useConfirmPeminjamanPengguna