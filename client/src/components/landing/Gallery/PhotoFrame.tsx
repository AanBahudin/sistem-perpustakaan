import React from 'react'
import {
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel"
import { galleryPict } from '@/utils/constants'


const PhotoFrame : React.FC = () => {
  return (
    <CarouselContent>
        {galleryPict.map(item => {
            return (
                <CarouselItem key={item.id} className="basis-full">
                    <div className="p-1">
                        <main className='w-full h-fit lg:h-[400px] overflow-hidden bg-muted rounded-2xl'>
                        <img className='rounded-xl object-fit grayscale-25' src={item.url} />
                        </main>
                    </div>
                </CarouselItem>
            )
        })}
    </CarouselContent>
  )
}

export default PhotoFrame