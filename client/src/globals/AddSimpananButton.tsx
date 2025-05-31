import { BookMarked, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addOrRemoveSimpanan, getAllSimpanan } from "@/actions/simpanActions"

const AddSimpananButton = ({id} : {id: string}) => {

    const queryClient = useQueryClient()

    const {data, isLoading: dataLoading} = useQuery({
        queryKey: ['simpan'],
        queryFn: getAllSimpanan
    })

    const {mutateAsync: addOrRemoveSimpananMutation} = useMutation({
        mutationFn: () => addOrRemoveSimpanan(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['simpan']})
            queryClient.invalidateQueries({
                queryKey: ['detail-book', id]
            })
        }
    })

    const handleClick = async() => {
        await addOrRemoveSimpananMutation()
    }

    if (dataLoading) {
        return (
            <Button disabled className='w-8 h-8 border p-2 bg-transparent hover:bg-muted'>
                <Loader2 className="w-8 h-8 stroke-white animate-spin" />
            </Button>
        )
    }
    const idBukuTersimpan = data.bukuDisimpan.map((item: any) => item.buku._id.toString())

    return (
        <>
            <Button type='submit' onClick={handleClick} className={`w-8 h-8 border p-2 ${idBukuTersimpan.includes(id) ? 'bg-primary-foreground hover:bg-primary' : 'bg-transparent hover:bg-muted'}  duration-200 ease-in-out`}>
                {dataLoading ? (
                    <Loader2 className="w-8 h-8 stroke-white animate-spin" />
                ) : (
                    <BookMarked className="w-8 h-8 stroke-white" />
                )}
            </Button>
            <input type="hidden" name="bookId" id="bookId" value={id}  />
        </>
    )
}

export default AddSimpananButton