import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { pembatalanPerpanjangan } from "@/actions/perpanjanganActions"
import { errorMsgGenerator } from "@/utils/errorMsgFunc"
import { toast } from "sonner"


type HooksProps = {
    idPerpanjangan: string
}

const useCancelPerpanjanganPengguna = ({ idPerpanjangan } : HooksProps) => {

    const [isModalOpen, setModalOpen] = useState(false)
    const navigate = useNavigate()
    
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: () => pembatalanPerpanjangan({idPerpanjangan}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['detail-peminjaman', 'perpanjangan', idPerpanjangan]})
            if (window.history.length > 2) {
                navigate(-1);
            } else {
                navigate('/my/data/perpanjangan');
            }
        },
        onError: (error: any) => {
            const errMsg = errorMsgGenerator(error) || 'Tidak dapat membatalkan pengajuan perpanjangan'
            toast('Terjadi kesalahan', {description: errMsg})
        }
    })

    const handleClick = async() => {
        await mutation.mutate()
        setModalOpen(false)
    }

    return {
        setModalOpen,
        isModalOpen,
        isLoading: mutation.isPending,
        mutationFn: handleClick
    }
}

export default useCancelPerpanjanganPengguna