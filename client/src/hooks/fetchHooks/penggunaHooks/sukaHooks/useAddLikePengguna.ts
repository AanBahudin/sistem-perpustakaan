import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { getAllSuka, addOrRemoveSukaNew } from "@/actions/sukaActions"
import { errorMsgGenerator } from "@/utils/errorMsgFunc"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

type HooksProps = {
    idBuku: string
}

const useAddLikePengguna = ({idBuku} : HooksProps) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const {data, isLoading} = useQuery({
        queryKey: ['suka'],
        queryFn: getAllSuka
    })

    const mutation = useMutation({
        mutationFn: () => addOrRemoveSukaNew(idBuku),
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

    const handleClick = async() => {
        await mutation.mutate()
    }

    const idBukuDisukai : any[]= data?.bukuDisukai?.map((item: any) => item._id)
    const isInludes = idBukuDisukai?.includes(idBuku)

    return {
        mutationLoading: mutation.isPending,
        mutationFn: handleClick,
        queryLoading: isLoading,
        isInludes
    }
}

export default useAddLikePengguna