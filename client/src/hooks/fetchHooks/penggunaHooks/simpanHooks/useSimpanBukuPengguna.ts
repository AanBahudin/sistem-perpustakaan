import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { getAllSimpananPengguna, toggleSimpananPengguna } from "@/actions/Pengguna/Simpan"
import { errorMsgGenerator } from "@/utils/errorMsgFunc"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

type HooksProps = {
    idBuku: string
}

const useSimpanBukuPengguna = ({idBuku} : HooksProps) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {data, isLoading} = useQuery({
        queryKey: ['simpan'],
        queryFn: getAllSimpananPengguna
    })

    const mutation = useMutation({
        mutationFn: () => toggleSimpananPengguna(idBuku),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['simpan']})
            toast('Ditambahkan ke simpan', {
                description: 'Lihat daftar buku yang disimpan',
                action: {
                    label: 'Lihat',
                    onClick: () => navigate('/my/tersimpan')
                }
             })
        },
        onError: (error: any) => {
            const errMsg = errorMsgGenerator(error) || 'Tidak dapat menambahkan ke simpan'
            toast('Terjadi kesalahan', {description: errMsg})
        }
    })

    const handleClick = () => {
        mutation.mutate()
    }

    const idBukuTersimpan = data?.bukuDisimpan?.map((item: any) => item.buku._id.toString())
    const isIncludes = idBukuTersimpan?.includes(idBuku)

    return {
        mutationLoading: mutation.isPending,
        queryLoading: isLoading,
        mutationFn: handleClick,
        isIncludes,
    }

}

export default useSimpanBukuPengguna