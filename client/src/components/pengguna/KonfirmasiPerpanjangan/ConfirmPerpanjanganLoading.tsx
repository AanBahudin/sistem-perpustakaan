import { Skeleton } from '@/components/ui/skeleton'
import Container from '@/globals/Container'

const ConfirmPerpanjanganLoading = () => {
  return (
    <Container className='w-4/5 my-10 flex gap-x-6'>
        <Skeleton className='w-2/3 h-[60vh] rounded-2xl flex flex-col'  />
        <Skeleton className='w-1/3 h-[60vh] rounded-2xl p-4' />
    </Container>
  )
}

export default ConfirmPerpanjanganLoading