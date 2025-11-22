import { Loader2, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useAddLikePengguna from '@/hooks/fetchHooks/penggunaHooks/sukaHooks/useAddLikePengguna'

const AddLikedButton = ({id} : {id: string}) => {
    
    // REFACTOR KOMPONEN INI
    /* 
        komponen ini dipake berulang pada berbagai halaman dengan jumlah yang banyak dalam sekali render
        yang mengakibatkan terjadinya fetch data yang sangat banyak, fungsi mutation nya meng-trigger
        banyak sekali re-render. 
    */

    const {
        mutationFn, mutationLoading,
        queryLoading, isInludes
    } = useAddLikePengguna({idBuku: id})

    if (queryLoading || mutationLoading) {
        return (
            <Button disabled className='w-8 h-8 border p-2 bg-transparent hover:bg-muted'>
                <Loader2 className="w-8 h-8 stroke-white animate-spin" />
            </Button>
        )
    }

    return (
        <>
            <Button type='submit' onClick={mutationFn} className={`w-8 h-8 border p-2 ${isInludes ? 'dark:bg-primary-foreground bg-primary hover:bg-primary' : 'bg-transparent hover:bg-muted'}`}>
                {queryLoading ? (
                    <Loader2 className="w-8 h-8 dark:stroke-white stroke-black animate-spin" />
                ) : (
                    <ThumbsUp className={`dark:stroke-white ${isInludes && 'stroke-white'} stroke-black w-8 h-8`} />
                )}
            </Button>
            <Input type="hidden" id="bukuId" name='bukuId' value={id} />
        </>
    )
}

export default AddLikedButton