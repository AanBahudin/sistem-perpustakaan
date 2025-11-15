import { testimoni } from "@/utils/constants"
import { Card, CardContent,  } from "@/components/ui/card"
import {
  CarouselItem,
} from "@/components/ui/carousel"

const TestimonialCard = () => {
  return (
    <>
    {testimoni.map((item, index) => (
      <CarouselItem key={index} className="basis-full md:basis-2/4 flex">
        <Card className="p-6 border-none bg-primary-foreground">
            <CardContent>
              <div className="w-full flex gap-x-4">
                  <div className="bg-primary/70 text-white w-12 h-12 rounded-full flex items-center justify-center">{item.name[0]}</div>
                  <main>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-muted-foreground text-xs ">{item.position}</p>
                  </main>
              </div>
              <p  className="mt-4 text-sm text-primary/80 dark:text-white">{item.message}</p>
            </CardContent>
          </Card>
        </CarouselItem>
      ))}
    </>
  )
}

export default TestimonialCard