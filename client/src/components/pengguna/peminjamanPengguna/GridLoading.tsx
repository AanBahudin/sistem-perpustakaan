import { Skeleton } from '@/components/ui/skeleton'

const GridLoading = () => {
  return (
    <section className='w-full grid grid-cols-12 gap-4'>
        {Array.from({length: 6}).map((_, index) => {
            return (
                <Skeleton key={index} className='w-full col-span-6 bg-transparent border flex gap-x-4 p-4'>
                    <Skeleton className='w-24 h-24' />

                    <div className='w-full flex flex-col items-start'>
                        <Skeleton className='w-2/3 h-5' />
                        <Skeleton className='w-1/2 h-3 mt-2' />
                        <Skeleton className='w-2/3 h-3 mt-2' />
                        <Skeleton className='w-2/6 h-3 mt-2' />
                    </div>
                </Skeleton>
            )
        })}
    </section>
  )
}

export default GridLoading