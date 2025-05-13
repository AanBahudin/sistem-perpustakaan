import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, X } from "lucide-react"
import { useRef, useState } from "react"


const PhotoProfile = () => {

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
        <section className="my-10 w-full flex items-center gap-x-8" >
            <img className="w-[100px] border-2 h-[100px] bg-muted rounded-full object-cover" src={img || 'https://res.cloudinary.com/dhthnjizr/image/upload/v1746624245/uk3h7ilkoo7wm2axglsd.jpg'} alt="" />

            <main className="flex gap-x-4">
                <Input ref={inputImg} type="file" accept='image/*'  className="w-[250px]" placeholder="Upload foto profil" onChange={handleImgInput}/>
                
                <div className={`${img ? 'flex' : 'hidden'} gap-x-2`}>
                    <Button onClick={handleCancel} variant='destructive'><X /></Button>
                    <Button type="submit" variant='default'><Check className="stroke-white" /></Button>
                </div>
            </main>
        </section>
    )
}

export default PhotoProfile