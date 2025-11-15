import { loginAction } from "@/actions/authActions"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const useLoginPengguna = () => {
    const navigate = useNavigate()   

    const mutation = useMutation({
        mutationFn: (data: FormData) => loginAction(data),
        onSuccess: (data: any) => {
            toast('Selamat Datang di Akun Anda', {description: 'Lihat apa yang dapat anda temukan'})

            const { verifikasiEmail, verifikasiProdi } = data
            if (verifikasiEmail && verifikasiProdi) {
                navigate('/my')
            } else {
                navigate('/status/account')
            }
        },
        onError: (error: any) => {
            const errMsg = error.response.data.message || 'Gagal Masuk, Coba lagi nanti'
            toast('Tidak dapat melakukan login', {description: errMsg})
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

export default useLoginPengguna