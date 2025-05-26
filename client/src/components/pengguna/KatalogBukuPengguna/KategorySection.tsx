import Container from '@/globals/Container'
import KategoryCard from './KategoryCard'
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const KategorySection = ({data} : {data:any}) => {
  return (
    <Container className='w-[95%] flex gap-x-3 items-center justify-center mt-20 mb-10'>
        <Carousel className='w-full'>
            <CarouselContent className='-ml-1'>
                <KategoryCard data={data} />
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </Container>
  )
}

export default KategorySection