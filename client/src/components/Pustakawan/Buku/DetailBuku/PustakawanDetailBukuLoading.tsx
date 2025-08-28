import { Skeleton } from '@/components/ui/skeleton'
import Container from '@/globals/Container'

const PustakawanDetailBukuLoading = () => {
  return (
    <Container className='w-full'>
        <Skeleton className="w-1/2 h-6 mb-4" />
        <section className='w-full flex items-center justify-start gap-x-6'>
            {Array.from({length: 4}).map((_, index: number) => {
                return (
                    <Skeleton key={index} className="min-w-[150px] h-6 mb-4" />
                )
            })}
        </section>

        <section className='w-full flex items-start gap-x-8 my-8'>
            <Skeleton className='w-3/4 min-h-[60vh] rounded-xl' />
            <Skeleton className='flex-1 rounded-xl h-[20vh]' />
        </section>
    </Container>
  )
}

export default PustakawanDetailBukuLoading