import { useSelector } from "react-redux"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { tambahPeminjamanPengguna } from "@/actions/Pengguna/Peminjaman"
import { setAlasan, setDurasi } from "@/cart/peminjamanSlice"
import { store } from "@/store"
import { toast } from "sonner"

/*
    REFACTOR DISINI
    PINDAHKAN TOAST DARI ACTION KE SINI
    REFACTOR GLOBAL STATE, KALAU BISA GUNAKAN FORM DATA SAJA UNTUK KIRIM DATA KE SERVER
*/

type HooksProps = {
    idBuku: string
}

const useConfirmPeminjamanPengguna = ({idBuku} : HooksProps) => {
    const {alasan, durasi} = useSelector((state: any) => state.peminjamanState)
    const [isModalOpen, setIsModalOpen]= useState<boolean>(false)
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: () => tambahPeminjamanPengguna({idBuku, alasan, durasi}),
        onSuccess: () => {
            setIsModalOpen(false)
            queryClient.invalidateQueries({queryKey: ['confirm', 'peminjaman', idBuku]})
            queryClient.invalidateQueries({queryKey: ['confirm', 'pinjaman', idBuku]})
            queryClient.invalidateQueries({ queryKey: ['stats', 'pengguna']})
            store.dispatch(setAlasan(''))
            store.dispatch(setDurasi(''))
        },
        onError: (error: any) => {
            const errMsg = error.response.data.message || 'Gagal memperbaharui durasi, Coba lagi nanti'
            toast('Terjadi kesalahan', {description: errMsg})
            setIsModalOpen(false)
        }
    })

    const handleClick = async() => {
        await mutation.mutate()
        setIsModalOpen(false)
    }

    return {
        isModalOpen,
        mutationFn: handleClick,
        isLoading: mutation.isPending,
        setIsModalOpen,
        alasan, durasi
    }
}

export default useConfirmPeminjamanPengguna