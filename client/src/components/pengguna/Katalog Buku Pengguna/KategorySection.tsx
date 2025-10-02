import Container from '@/globals/Container'
import KategoryCard from './KategoryCard'
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useQuery } from '@tanstack/react-query'
import { getAllKategori } from '@/actions/kategoriAction'
import BookCategoryLoading from '@/components/Loading/BookCategoryLoading'
import { cn } from '@/lib/utils'

const KategorySection = ({className} : {className?: string}) => {
  const {data, isLoading} = useQuery({
    queryKey: ['kategori'],
    queryFn: getAllKategori
  })


  if (isLoading) return <BookCategoryLoading />

  return (
    <Container className={cn('w-[95%] flex gap-x-3 items-center justify-center mt-20 mb-10', className)}>
        <Carousel className='w-full'>
            <CarouselContent className='-ml-1'>
                <KategoryCard data={data.data} />
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </Container>
  )
}

export default KategorySection