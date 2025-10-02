import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Loader, X } from "lucide-react"
import { useRef } from "react"
import { store } from "@/store"
import { useSelector } from "react-redux"
import { removeSelectedImg, setSelectedImg } from "@/cart/profileSlice"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePhotoAction } from "@/actions/userActions"
import { toast } from "sonner"
import { errorMsgGenerator } from "@/utils/errorMsgFunc"


const PhotoProfile = ({fotoProfil} : {fotoProfil: string | undefined}) => {

    const queryClient = useQueryClient()
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

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        mutation.mutate(formData)
    }

    const {selectedImg} = useSelector((state: any) =>  state.profileState)
    const inputImg = useRef<HTMLInputElement>(null)


    const handleImgInput = (event: any) => {
        const file = event.target.files[0]
        if (file) {
            store.dispatch(setSelectedImg(URL.createObjectURL(file)))
        }
    }

    const handleCancel = () => {
        store.dispatch(setSelectedImg(''))
        if(inputImg.current) {
            inputImg.current.value = ''
        }
    }

    const isLoading = mutation.isPending

    return (
        <form onSubmit={handleSubmit} encType='multipart/form-data' className="w-full relative flex items-center gap-x-4 my-6">
            <img className="w-[100px] border-2 h-[100px] bg-muted rounded-full object-cover" src={selectedImg ? selectedImg : (fotoProfil ? fotoProfil : 'https://res.cloudinary.com/dhthnjizr/image/upload/v1746624245/uk3h7ilkoo7wm2axglsd.jpg')} alt="" />

            <main className="flex gap-x-4">
                <Input ref={inputImg} name="fotoProfil" id="fotoProfil" type="file" accept='image/*'  className="w-[250px]" placeholder="Upload foto profil" onChange={handleImgInput}/>
                
                <div className={`${selectedImg ? 'flex' : 'hidden'} gap-x-2`}>
                    <Button disabled={isLoading} type="button" onClick={handleCancel} variant='destructive'><X /></Button>
                    <Button disabled={isLoading} type="submit" variant='default'>
                        {isLoading ? <Loader className="stroke-white animate-spin"/> : <Check className="stroke-white" />}
                    </Button>
                </div>
            </main>
        </form >
    )
}

export default PhotoProfile