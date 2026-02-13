import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { pustakawanEditBukuAction } from '@/actions/Pustakawan/Buku'
import useGetDetailBukuPustakawan from './useGetDetailBukuPustakawan'
import { errorMsgGenerator } from '@/utils/errorMsgFunc'

const useEditBukuPustakawan = () => {

    const {idBuku} = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const {data: dataBuku, isLoading} = useGetDetailBukuPustakawan()

    const mutation = useMutation({
        mutationFn: (data: any) => pustakawanEditBukuAction({data, idBuku: idBuku as string}),
        onSuccess: () => {
            toast('Berhasil Ditambahkan', {description: 'Buku berhasil diupdate!'})
            queryClient.invalidateQueries({queryKey: ['detail', 'buku', idBuku]})
            navigate(`/pustakawan/buku/detail/${idBuku}`)
        },
        onError: (error: any) => {
            const errMsg = errorMsgGenerator(error) || 'Tidak dapat update buku'
            toast('Terjadi kesalahan', {description: errMsg})
        }
    })

    const handleSubmit = async(e: any) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        mutation.mutate(formData)
    }

    return {
        dataBuku,
        queryLoading: isLoading,
        mutationLoading: mutation.isPending,
        submitFn: handleSubmit
    }
}

export default useEditBukuPustakawan