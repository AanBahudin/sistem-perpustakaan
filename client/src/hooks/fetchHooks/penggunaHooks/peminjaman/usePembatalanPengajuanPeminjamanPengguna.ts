import { useLocation, useNavigate } from "react-router-dom"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { batalkanPeminjamanPengguna } from "@/actions/Pengguna/Peminjaman"
import { toast } from "sonner"
import { errorMsgGenerator } from "@/utils/errorMsgFunc"

type HooksProps = {
    idPeminjaman: string,
    idBuku: string
}


const usePembatalanPengajuanPeminjamanPengguna = ({ idPeminjaman, idBuku } : HooksProps) => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: () => batalkanPeminjamanPengguna({idPeminjaman: idPeminjaman}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['detail-peminjaman', idBuku]})
            toast('Peminjaman Dibatalkan')
            if (pathname.includes('peminjaman')) {
                navigate('/my/data/peminjaman')
            }
        },
        onError: (error: any) => {
            const errMsg = errorMsgGenerator({error, defaultMsg: 'Tidak dapat membatalkan peminjaman ini, coba lagi nanti'})
            toast('Terjadi kesalahan', {description: errMsg})
        }
    })


    const handleClick = () => {
        mutation.mutate()
    }

    return {
        mutateFn: handleClick,
        isLoading: mutation.isPending,
    }
}

export default usePembatalanPengajuanPeminjamanPengguna