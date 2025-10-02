import Container from "@/globals/Container"
import { Skeleton } from "@/components/ui/skeleton"

const BukuLoading = () => {
  return (
    <Container className='w-full'>
        <section className="w-full flex items-center justify-between mb-4">
            <Skeleton className="w-1/3 h-6" />
            <Skeleton className="w-[150px] h-10" />
        </section>
        <Skeleton className="w-full h-[40vh] rounded-2xl" />

        <section className="w-full my-6 flex items-center gap-x-4">
            <Skeleton className="flex-1 h-10 rounded" />
            <Skeleton className="w-[40%] h-10 rounded" />
            <Skeleton className="w-[20%] h-10 rounded" />
        </section>

        <Skeleton className="w-full min-h-[50vh]" />
    </Container>
  )
}

export default BukuLoading