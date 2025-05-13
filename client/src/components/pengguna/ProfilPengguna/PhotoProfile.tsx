import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useFormStatus } from "@/context/FormContext"
import { Check, Loader, X } from "lucide-react"
import { useRef, useState } from "react"
import { useRouteLoaderData } from "react-router-dom"


const PhotoProfile = () => {
    const data = useRouteLoaderData('user-profil')
    const {isLoading}  = useFormStatus()

    const inputImg = useRef<HTMLInputElement>(null)
    const [img, setImg] = useState('')
    const handleImgInput = (event: any) => {
        const file = event.target.files[0]
        if (file) {
            setImg(URL.createObjectURL(file))
        }
    }

    const handleCancel = () => {
        setImg('')
        if (inputImg.current) {
            inputImg.current.value = ''
        }
    }

    return (
        <>
            <img className="w-[100px] border-2 h-[100px] bg-muted rounded-full object-cover" src={img ? img : (data.fotoProfil ? data.fotoProfil : 'https://res.cloudinary.com/dhthnjizr/image/upload/v1746624245/uk3h7ilkoo7wm2axglsd.jpg')} alt="" />

            <main className="flex gap-x-4">
                <Input ref={inputImg} name="fotoProfil" id="fotoProfil" type="file" accept='image/*'  className="w-[250px]" placeholder="Upload foto profil" onChange={handleImgInput}/>
                
                <div className={`${img ? 'flex' : 'hidden'} gap-x-2`}>
                    <Button disabled={isLoading} type="button" onClick={handleCancel} variant='destructive'><X /></Button>
                    <Button disabled={isLoading} type="submit" variant='default'>
                        {isLoading ? <Loader className="stroke-white animate-spin"/> : <Check className="stroke-white" />}
                    </Button>
                </div>
            </main>
        </>
    )
}

export default PhotoProfile