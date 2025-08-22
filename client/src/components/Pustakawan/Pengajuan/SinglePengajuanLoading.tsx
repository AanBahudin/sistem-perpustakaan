import Container from "@/globals/Container"
import { Skeleton } from "@/components/ui/skeleton"

const SinglePengajuanLoading = () => {
  return (
    <Container className="w-full">
        <Skeleton className="w-1/2 h-6 mb-4" />
        <Skeleton className="w-1/3 h-6 mb-4" />

        <section className='w-full flex items-start gap-x-8'>
            <Skeleton className="w-3/4 h-[80vh] rounded-xl" />
            <Skeleton className="w-1/4 rounded-xl h-[40vh]" />
        </section>
    </Container>
  )
}

export default SinglePengajuanLoading