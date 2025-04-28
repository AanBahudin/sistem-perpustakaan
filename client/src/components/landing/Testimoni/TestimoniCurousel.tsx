import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
} from "@/components/ui/carousel"
import TestimonialCard from "./TestimonialCard"

const TestimonialCarousel = () => {
  return (
    <div className="relative w-full">
      <Carousel opts={{align: "start", loop: true}}  plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}>
        <CarouselContent>
          <TestimonialCard />
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default TestimonialCarousel
