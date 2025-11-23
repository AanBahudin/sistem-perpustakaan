import { useState } from "react"
import { penggunaUpdateEmailAction } from "@/actions/Pengguna/Profil"
import { errorMsgGenerator } from "@/utils/errorMsgFunc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const useUpdateEmailPengguna = () => {
    const queryClient = useQueryClient()

    const [open, setOpen] = useState(false)
    const handleOpen = (value: boolean) => {
        setOpen(value)
    }

    const mutation = useMutation({
        mutationFn: (data: FormData) => penggunaUpdateEmailAction(data),
        onSuccess: () => {
            toast('Diperbaharui', {description: 'Tautan Verifikasi Telah Kami Kirim Ke Akun Anda, Silahkan Verifikasi'})
            queryClient.invalidateQueries({queryKey: ['pengguna', 'profil']})
            handleOpen(false)
        },
        onError: (error: any) => {
            const errMsg = errorMsgGenerator(error)
            toast('Gagal memperbaharui email', {description: errMsg})
            handleOpen(false)
        }
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        mutation.mutate(formData)
    }

    const isLoading = mutation.isPending

    return {
        isLoading,
        mutationFn: handleSubmit,
        open,
        handleOpen
    }

}

export default useUpdateEmailPengguna