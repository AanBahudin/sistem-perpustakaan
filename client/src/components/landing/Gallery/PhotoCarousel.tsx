import React from 'react'
import {
    Carousel,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import PhotoFrame from './PhotoFrame'

const PhotoCarousel : React.FC = () => {
  return (
    <Carousel opts={{ align: "center", loop: true}} className="w-[87%] lg:w-[60%] mx-auto" >

        <PhotoFrame />        

        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
  )
}

export default PhotoCarousel