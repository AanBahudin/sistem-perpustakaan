import { updateMaksimalPeminjaman } from "@/actions/GlobalActions/MaksimalPeminjamanActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const useUpdateMaksimalPeminjamanPengguna = ({id} : {id:string}) => {

    const [openDialog, setOpenDialog] = useState(false)
    const handleOpen = (value: boolean) => setOpenDialog(value)


    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (data: FormData) => updateMaksimalPeminjaman({data, id}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['maks peminjaman']})
            toast('Berhasil Diperbaharui', {description: 'Maksimal peminjaman berhasil diubah'})
            handleOpen(false)
        },
        onError: (error: any) => {
            console.log(error)
            const errMsg = error.response.data.message || 'Gagal memperbaharui, Coba lagi nanti'
            toast('Terjadi kesalahan', {description: errMsg})
            handleOpen(false)
        }
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        mutation.mutate(formData)
    }


    return {
        isLoading: mutation.isPending,
        openDialog,
        handleOpenFn: handleOpen,
        mutationFn: handleSubmit
    }
}

export default useUpdateMaksimalPeminjamanPengguna