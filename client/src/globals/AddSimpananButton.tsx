import { BookMarked, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addOrRemoveSimpanan, getAllSimpanan } from "@/actions/simpanActions"
import { useState } from "react"

const AddSimpananButton = ({id} : {id: string}) => {

    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)

    const {data, isLoading: dataLoading} = useQuery({
        queryKey: ['simpan'],
        queryFn: getAllSimpanan
    })

    const {mutateAsync: addOrRemoveSimpananMutation} = useMutation({
        mutationFn: () => addOrRemoveSimpanan(id),
        onMutate: () => {
            setLoading(true)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['simpan']})
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
        await addOrRemoveSimpananMutation()
    }

    if (dataLoading || loading) {
        return (
            <Button disabled className='w-8 h-8 border p-2 bg-transparent hover:bg-muted'>
                <Loader2 className="w-8 h-8 dark:stroke-white stroke-primary animate-spin" />
            </Button>
        )
    }

    const idBukuTersimpan = data?.bukuDisimpan.map((item: any) => item.buku._id.toString())
    const isIncludes = idBukuTersimpan.includes(id)

    return (
        <>
            <Button type='submit' onClick={handleClick} className={`w-8 h-8 border p-2 ${isIncludes ? 'dark:bg-primary-foreground bg-primary hover:bg-primary' : 'bg-transparent hover:bg-muted'}  duration-200 ease-in-out`}>
                {dataLoading ? (
                    <Loader2 className="w-8 h-8 dark:stroke-white stroke-primary animate-spin" />
                ) : (
                    <BookMarked className={`w-8 h-8 dark:stroke-white ${isIncludes && 'stroke-white'} stroke-black`} />
                )}
            </Button>
            <input type="hidden" name="bookId" id="bookId" value={id}  />
        </>
    )
}

export default AddSimpananButton