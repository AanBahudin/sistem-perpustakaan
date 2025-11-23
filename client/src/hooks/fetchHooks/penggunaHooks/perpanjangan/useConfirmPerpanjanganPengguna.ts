import { setAlasan, setDurasi } from "@/cart/peminjamanSlice"
import { store } from "@/store"
import { useSelector } from "react-redux"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { penggunaTambahPerpanjangan } from "@/actions/Pengguna/Perpanjangan"
import { errorMsgGenerator } from "@/utils/errorMsgFunc"
import { toast } from "sonner"

type HooksProps = {
    idPeminjaman: string,
    idBuku: string
}

const useConfirmPerpanjanganPengguna = ({ idPeminjaman, idBuku } : HooksProps) => {
    
    const {alasan, durasi} = useSelector((state: any) => state.peminjamanState)
    const [isModalOpen, setIsModalOpen]= useState<boolean>(false)
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: () => penggunaTambahPerpanjangan({idPeminjaman, idBuku, durasi, alasan}),
        onMutate: () => {
            setIsModalOpen(true)
        },
        onSuccess: () => {
            setIsModalOpen(false)
            queryClient.invalidateQueries({queryKey: ['peminjaman', idPeminjaman]})
            queryClient.invalidateQueries({queryKey: ['perpanjangan', 'peminjamnan', idPeminjaman]})
            queryClient.invalidateQueries({ queryKey: ['stats', 'pengguna']})
        },
        onError: (error: any) => {
            const errMsg = errorMsgGenerator(error) || 'Terjadi kesalahan saat mengajukan perpanjangan'
            setIsModalOpen(false)
            toast('Terjadi kesalahan', {description: errMsg})
        }
    })
    
    const handleClick = async() => {
        await mutation.mutate()
        store.dispatch(setAlasan(''))
        store.dispatch(setDurasi(''))
        setIsModalOpen(false)
    }

    return {
        isLoading: mutation.isPending,
        mutationFn: handleClick,
        isModalOpen,
        setIsModalOpen,
        alasan, durasi
    }
}

export default useConfirmPerpanjanganPengguna