import Container from '@/globals/Container'
import { Skeleton } from '../ui/skeleton'

const BookCategoryLoading = () => {
  return (
    <Container className='w-[95%] mt-20 my-10 flex items-center justify-center gap-x-6'>
      {Array.from({length: 6}).map((_, index) => {
        return (
          <Skeleton key={index} className='w-full h-10' />
        )
      })}
    </Container>
  )
}

export default BookCategoryLoading