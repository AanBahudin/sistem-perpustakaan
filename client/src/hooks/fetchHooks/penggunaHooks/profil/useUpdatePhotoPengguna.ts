import { useQueryClient, useMutation } from "@tanstack/react-query"
import { updatePhotoAction } from "@/actions/userActions"
import { useSelector } from "react-redux"
import { useRef } from "react"
import { store } from "@/store"
import { setSelectedImg, removeSelectedImg } from "@/cart/profileSlice"
import { errorMsgGenerator } from "@/utils/errorMsgFunc"
import { toast } from "sonner"

const useUpdatePhotoPengguna = () => {
    const queryClient = useQueryClient()
    const inputImg = useRef<HTMLInputElement>(null)

    const {selectedImg} = useSelector((state: any) =>  state.profileState)

    const handleImgInput = (event: any) => {
        const file = event.target.files[0]
        if (file) {
            store.dispatch(setSelectedImg(URL.createObjectURL(file)))
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        mutation.mutate(formData)
    }
    
    const handleCancel = () => {
        store.dispatch(setSelectedImg(''))
        if(inputImg.current) {
            inputImg.current.value = ''
        }
    }

    const mutation = useMutation({
        mutationFn: (data: FormData) => updatePhotoAction(data),
        onSuccess: () => {
            store.dispatch(removeSelectedImg())
            queryClient.invalidateQueries({queryKey: ['pengguna', 'profil']})
            toast('Diperbaharui', {description: 'Foto profil anda berhasil diperbaharui'})
        },
        onError: (error: any) => {
            const errMsg = errorMsgGenerator(error)
            toast('Gagal memperbaharui', {description: errMsg})
        }
    })

    return {
        isLoading: mutation.isPending,
        selectedImg,
        handleSubmit,
        handleCancel,
        handleImgInput,
        inputImg
    }
}

export default useUpdatePhotoPengguna