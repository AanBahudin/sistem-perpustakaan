import Container from '@/globals/Container'
import { Skeleton } from '@/components/ui/skeleton'

const PustakawanEditBukuLoading = () => {
  return (
    <Container className='w-full'>
        <Skeleton className="w-1/2 h-6 mb-4" />

        <section className='w-full flex my-10 items-center justify-between'>
            <Skeleton className='h-6 w-[200px]' />
            <Skeleton className='h-6 w-[150px]' />
        </section>

        <section className='flex w-full items-start justify-start gap-x-6'>
            <main className='w-[70%] flex flex-col gap-y-6'>
                <Skeleton className='w-full min-h-[50vh]' />
                <Skeleton className='w-full min-h-[30vh]' />
                <Skeleton className='w-full min-h-[25vh]' />
            </main>

            <main className='flex-1 flex flex-col items-center justify-center gap-y-4'>
                <Skeleton className='w-full h-[40vh]' />
                <Skeleton className='w-full h-[30vh]' />
            </main>
        </section>

    </Container>
  )
}

export default PustakawanEditBukuLoading