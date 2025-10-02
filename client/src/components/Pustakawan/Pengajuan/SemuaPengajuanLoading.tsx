import { Skeleton } from "@/components/ui/skeleton"
import Container from "@/globals/Container"

const SemuaPengajuanLoading = () => {
  return (
    <Container className='w-full'>
      <Skeleton className="w-1/3 h-6 mb-4" />
      <Skeleton className="w-full h-[40vh] rounded-2xl" />
      <Skeleton className="w-full min-h-[50vh] my-6" />
    </Container>
  )
}

export default SemuaPengajuanLoading