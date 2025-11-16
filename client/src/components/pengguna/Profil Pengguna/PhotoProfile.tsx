import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Loader, X } from "lucide-react"
import useUpdatePhotoPengguna from "@/hooks/fetchHooks/penggunaHooks/profil/useUpdatePhotoPengguna"

const PhotoProfile = ({fotoProfil} : {fotoProfil: string | undefined}) => {

    const { handleSubmit, inputImg, selectedImg, isLoading, handleCancel, handleImgInput } = useUpdatePhotoPengguna()

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