import { Loader2, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useAddLikePengguna from '@/hooks/fetchHooks/penggunaHooks/sukaHooks/useAddLikePengguna'
import useGetAllBukuPenggunaDisuka from '@/hooks/fetchHooks/penggunaHooks/sukaHooks/useGetAllBukuPenggunaDisuka'

const AddLikedButton = ({id} : {id: string}) => {
    
    // REFACTOR KOMPONEN INI
    /* 
        komponen ini dipake berulang pada berbagai halaman dengan jumlah yang banyak dalam sekali render
        yang mengakibatkan terjadinya fetch data yang sangat banyak, fungsi mutation nya meng-trigger
        banyak sekali re-render. 
    */

    // hook untuk toggle status like
    const {mutationFn, mutationLoading} = useAddLikePengguna({idBuku: id})
    // hook untuk ambil data buku yang diuka
    const {data, isLoading: queryLoading} = useGetAllBukuPenggunaDisuka()
    if (queryLoading || mutationLoading) {
        return (
            <Button disabled className='w-8 h-8 border p-2 bg-transparent hover:bg-muted'>
                <Loader2 className="w-8 h-8 stroke-white animate-spin" />
            </Button>
        )
    }


    const {bukuDisukai} = data;
    const buku = bukuDisukai.map((item: any) => item._id)
    const isIncludes = buku?.includes(id)

    return (
        <>
            <Button type='submit' onClick={mutationFn} className={`w-8 h-8 border p-2 ${isIncludes ? 'dark:bg-primary-foreground bg-primary hover:bg-primary' : 'bg-transparent hover:bg-muted'}`}>
                <ThumbsUp className={`dark:stroke-white ${isIncludes && 'stroke-white'} stroke-black w-8 h-8`} />
            </Button>
        </>
    )
}

export default AddLikedButton