import { useQueryClient, useMutation } from "@tanstack/react-query"
import { toggleSukaPengguna } from "@/actions/Pengguna/Suka"
import { errorMsgGenerator } from "@/utils/errorMsgFunc"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

type HooksProps = {
    idBuku: string
}

const useAddLikePengguna = ({idBuku} : HooksProps) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: () => toggleSukaPengguna(idBuku),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['suka']})
            toast('Ditambahkan ke suka', {
                description: 'Lihat daftar buku yang disukai',
                action: {
                    label: 'Lihat',
                    onClick: () => navigate('/my/disukai')
                }
             })
        },
        onError: (error: any) => {
            const errMsg = errorMsgGenerator(error) || 'Tidak dapat menambahkan ke suka'
            toast('Terjadi kesalahan', {description: errMsg})
        }
    })

    const handleClick = () => {
        mutation.mutate()
    }
    
    return {
        mutationLoading: mutation.isPending,
        mutationFn: handleClick,
    }
}

export default useAddLikePengguna