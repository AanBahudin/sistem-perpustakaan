import Container from "@/globals/Container"
import { Skeleton } from "../ui/skeleton"

const BookLoading = () => {
  return (
    <Container className='my-20'>
      <Skeleton className="w-full min-h-[300px]" />

      <main className="w-full mt-18 items-center justify-center flex gap-x-8">
        {Array.from({length: 5}).map((_, index: number) => {
          return (
            <Skeleton key={index} className="min-h-[300px] w-[230px] rounded-xl" />
          )
        })} 
      </main>
    </Container>
  )
}

export default BookLoading