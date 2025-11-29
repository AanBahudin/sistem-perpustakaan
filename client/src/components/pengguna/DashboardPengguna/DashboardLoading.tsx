import { Skeleton } from '@/components/ui/skeleton'
import Container from '@/globals/Container'

const DashboardLoading = () => {
  return (
    <Container className='my-16'>
        <section className='flex items-center gap-x-6'>
            <Skeleton className='w-3/4 rounded-2xl h-[250px]' />
            <Skeleton className='w-1/4 h-[250px] rounded-2xl' />
        </section>

        <section className='grid grid-cols-5 gap-x-5 my-6'>
            {Array.from({length: 5}).map((_, index: number) => {
                return (
                    <Skeleton key={index} className='col-span-1 h-[150px] rounded-xl' />
                )
            })}
        </section>

        <section className='w-full'>
            <Skeleton className='w-full h-[350px] rounded-2xl' />
        </section>
    </Container>
  )
}

export default DashboardLoading