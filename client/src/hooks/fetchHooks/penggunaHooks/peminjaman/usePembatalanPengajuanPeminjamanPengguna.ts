import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { batalkanPeminjamanPengguna } from "@/actions/Pengguna/Peminjaman"
import { toast } from "sonner"

type HooksProps = {
    idPeminjaman: string,
    idBuku: string
}


const usePembatalanPengajuanPeminjamanPengguna = ({ idPeminjaman, idBuku } : HooksProps) => {
    const {pathname} = useLocation()
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: () => batalkanPeminjamanPengguna({idPeminjaman: idPeminjaman}),
        onMutate: () => {
            setIsModalOpen(true)
        },
        onSuccess: () => {
            setIsModalOpen(false)
            queryClient.invalidateQueries({queryKey: ['detail-peminjaman', idBuku]})
            toast('Peminjaman Dibatalkan')
            if (pathname.includes('peminjaman')) {
                navigate('/my/data/peminjaman')
            }
        },
        onError: () => {
            setIsModalOpen(false)
        }
    })


    const handleClick = async() => {
        await mutation.mutate()
        setIsModalOpen(false)
    }

    return {
        setIsModalOpen,
        mutateFn: handleClick,
        isLoading: mutation.isPending,
        isModalOpen
    }
}

export default usePembatalanPengajuanPeminjamanPengguna