import { BookMarked, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import useSimpanBukuPengguna from "@/hooks/fetchHooks/penggunaHooks/simpanHooks/useSimpanBukuPengguna"

const AddSimpananButton = ({id} : {id: string}) => {

    // REFACTOR KOMPONEN INI
    /* 
        komponen ini dipake berulang pada berbagai halaman dengan jumlah yang banyak dalam sekali render
        yang mengakibatkan terjadinya fetch data yang sangat banyak, fungsi mutation nya meng-trigger
        banyak sekali re-render. 
    */

    const {
        mutationFn, mutationLoading,
        queryLoading, isIncludes
    } = useSimpanBukuPengguna({idBuku: id})

    if (queryLoading || mutationLoading) {
        return (
            <Button disabled className='w-8 h-8 border p-2 bg-transparent hover:bg-muted'>
                <Loader2 className="w-8 h-8 dark:stroke-white stroke-primary animate-spin" />
            </Button>
        )
    }

    return (
        <>
            <Button type='submit' onClick={mutationFn} className={`w-8 h-8 border p-2 ${isIncludes ? 'dark:bg-primary-foreground bg-primary hover:bg-primary' : 'bg-transparent hover:bg-muted'}  duration-200 ease-in-out`}>
                {queryLoading ? (
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