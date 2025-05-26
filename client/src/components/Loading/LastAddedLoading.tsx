import { Skeleton } from "../ui/skeleton"

const LastAddedLoading = () => {
  return (
    <section className='w-full'>
        <h1 className='font-semibold text-xl'>Buku Terbaru</h1>

        <main className='w-full flex items-center justify-center gap-x-10 mt-6 px-6'>
            <Skeleton className='w-[300px] h-[350px] rounded-xl'/>

            <div className='self-start'>
                <Skeleton className="w-1/2 h-8" />
                <Skeleton className="w-1/3 h-5 my-2" />

                <div className='flex gap-x-4'>
                    {Array.from({length: 3}).map((_, index:number) => {
                        return (
                            <Skeleton key={index} className="px-4 rounded py-1 w-[200px] h-8" />
                        )
                    })}
                </div>

                <Skeleton className="w-full h-5 mt-4" />
                <Skeleton className="w-[89%] h-5 mt-4" />
                <Skeleton className="w-[80%] h-5 mt-4" />

                {/* <p className='mt-4 text-muted-foreground'>{book.deskripsi.slice(0,500)}...</p> */}

               <div className='mt-4 flex items-start justify-start gap-x-20'>
                    <Skeleton className="w-[200px] h-6 mt-4" />
                    <Skeleton className="w-[200px] h-6 mt-4" />
                    <Skeleton className="w-[200px] h-6 mt-4" />
                    <Skeleton className="w-[200px] h-6 mt-4" />
               </div>

               <Skeleton className="w-full h-9 self-end mt-10 rounded" />
            </div>
        </main>
    </section>
  )
}

export default LastAddedLoading