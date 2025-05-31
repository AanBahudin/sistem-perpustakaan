import { Loader2, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addOrRemoveSukaNew, getAllSuka } from '@/actions/sukaActions'
import { useState } from 'react'

const AddLikedButton = ({id} : {id: string}) => {
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)

    const {data, isLoading: reactQueryLoading} = useQuery({
        queryKey: ['suka'],
        queryFn: getAllSuka
    })

    const {mutateAsync: addOrRemoveLikeMutation} = useMutation({
        mutationFn: () => addOrRemoveSukaNew(id),
        onMutate: () => {
            setLoading(true)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['suka']
            })
            queryClient.invalidateQueries({
                queryKey: ['detail-book', id]
            })
            setLoading(false)
        },
        onError: () => {
            setLoading(false)
        }
    })

    const handleClick = async() => {
        await addOrRemoveLikeMutation()
    }

    if (reactQueryLoading || loading) {
        return (
            <Button disabled className='w-8 h-8 border p-2 bg-transparent hover:bg-muted'>
                <Loader2 className="w-8 h-8 stroke-white animate-spin" />
            </Button>
        )
    }

    const idBukuDisukai : any[]= data.bukuDisukai.map((item: any) => item._id)
    return (
        <>
            <Button type='submit' onClick={handleClick} className={`w-8 h-8 border p-2 ${idBukuDisukai.includes(id) ? 'bg-primary-foreground hover:bg-primary' : 'bg-transparent hover:bg-muted'}`}>
                {reactQueryLoading ? (
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