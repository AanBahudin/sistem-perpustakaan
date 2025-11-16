import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { updateProfileAction } from "@/actions/userActions"
import { errorMsgGenerator } from "@/utils/errorMsgFunc"
import { toast } from "sonner"

interface useUpdateInfoPenggunaProps {
    errMsg: string,
    successMsg: string  
}

const useUpdateInfoPengguna = ({ errMsg, successMsg } : useUpdateInfoPenggunaProps) => {

    const [open, setOpen] = useState(false)
    const handleOpen = (value: boolean) => {
        setOpen(value)
    }

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (data: FormData) => updateProfileAction(data),
        onSuccess: () => {
            toast('Diperbaharui', {description: successMsg})
            queryClient.invalidateQueries({queryKey: ['pengguna', 'profil']})
            handleOpen(false)
        },
        onError: (error: any) => {
            const errorMsg = errorMsgGenerator(error)
            toast(errMsg, {description: errorMsg})
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
        open,
        mutationFn: handleSubmit,
        handleOpen
    }
}

export default useUpdateInfoPengguna