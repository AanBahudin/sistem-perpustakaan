import {pustakawanLoginAction} from "@/actions/Pustakawan/Auth"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const useLoginPustakawan = () => {

    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: (data: any) => pustakawanLoginAction(data),
        onSuccess: () => {
            toast('Selamat Datang di Akun Anda', {description: 'Lihat apa yang dapat anda temukan'})
            navigate('/pustakawan')
        },
        onError: (data: any) => {
            const serverErrMsg = data.response.data.message
            const titleMsg = serverErrMsg ? 'Terjadi kesalahan!' : 'TIdak dapat melakukan login'
            const errMsg = serverErrMsg || 'Tidak dapat melakukan login'
            toast(titleMsg , {description: errMsg})
        }
    })
    
    const handleSubmit = (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)
        mutation.mutate(data)
    }
    return {
        isLoading: mutation.isPending,
        mutationFn: handleSubmit
    }
}

export default useLoginPustakawan