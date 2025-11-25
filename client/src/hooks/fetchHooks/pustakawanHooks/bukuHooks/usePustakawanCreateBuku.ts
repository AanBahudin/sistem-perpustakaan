import { useMutation } from '@tanstack/react-query'
import { pustakawanCreateBukuAction } from '@/actions/Pustakawan/Buku'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const usePustakawanCreateBuku = () => {
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn: (data: any) => pustakawanCreateBukuAction({data}),
        onSuccess: () => {
            toast('Berhasil Ditambahkan', {description: 'Buku berhasil ditambahkan!'})
            navigate('/pustakawan/buku')
        },
        onError: () => {
            toast('Terjadi kesalahan', {description: 'Tidak dapat menambahkan buku'})
        }
    })

    const handleSubmit = async(e: any) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const objectData = Object.fromEntries(formData)
        mutation.mutate(objectData)
    }

    return {
        isLoading: mutation.isPending,
        submitFn: handleSubmit
    }
}

export default usePustakawanCreateBuku