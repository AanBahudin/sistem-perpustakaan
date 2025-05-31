import { Loader2, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFormStatus } from '@/context/FormContext'
import { Input } from '@/components/ui/input'

const AddLikedButton = ({id, likedData} : {id: string, likedData: any}) => {
    const {isLoading} = useFormStatus()
    const idBukuDisukai : any[]= likedData.map((item: any) => item._id)
    return (
        <>
            <Button type='submit' className={`w-8 h-8 border p-2 ${idBukuDisukai.includes(id) ? 'bg-primary-foreground hover:bg-primary' : 'bg-transparent hover:bg-muted'}`}>
                {isLoading ? (
                    <Loader2 className="w-8 h-8 stroke-white animate-spin" />
                ) : (
                    <ThumbsUp className={`stroke-white w-8 h-8`} />
                )}
            </Button>
            <Input type="hidden" id="bukuId" name='bukuId' value={id} />
        </>
    )
}

export default AddLikedButton