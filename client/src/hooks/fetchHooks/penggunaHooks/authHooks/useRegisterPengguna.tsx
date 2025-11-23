import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { registerPenggunaAction } from "@/actions/Pengguna/Auth"

const useRegisterPengguna = () => {
    const navigate = useNavigate()

    const mutation = useMutation({
    mutationFn: (data: FormData) => registerPenggunaAction(data),
    onSuccess: () => {
        toast('Berhasil melakukan pendaftaran', {description: 'Silahkan verifikasi email anda'})
        navigate('/status/account')
    },
    onError: (error: any) => {
            const errMsg = error.response.data.message || 'Gagal melakukan pendaftaran, Coba lagi nanti'
            toast('Tidak dapat melakukan pendaftaran', {description: errMsg})
        }
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        mutation.mutate(formData)
    }

    return {
        isLoading: mutation.isPending,
        mutationFn: handleSubmit
    }
}

export default useRegisterPengguna

