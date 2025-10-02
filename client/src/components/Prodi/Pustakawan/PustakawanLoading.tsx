import { Skeleton } from '@/components/ui/skeleton'

const PustakawanLoading = () => {
  return (
    <section className='w-full grid grid-cols-4 my-4 gap-4'>
        {Array.from({length: 4}).map((_, index: number) => {
            return (
                <Skeleton key={index} className='w-full rounded-xl min-h-[30vh]' />
            )
        })}
    </section>
  )
}

export default PustakawanLoading