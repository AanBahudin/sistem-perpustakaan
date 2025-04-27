import Container from "@/globals/Container"
import {stats} from '@/utils/constants'
import { Users } from "lucide-react"

const Statistik = () => {
  return (
    <Container className="my-20 pt-10">
      <section className="grid grid-cols-1 md:grid-cols-3 lg:gap-x-6 gap-y-4 lg:gap-y-0 gap-x-0 ">
        

        {stats.map((item, index) => {
          return (
            <div key={index} className="flex flex-col items-center justify-center px-4 py-8 lg:py-12 rounded-2xl shadow-primary/50 shadow-2xl">
              {item.icon}
              <h1 className="font-semibold text-3xl lg:text-4xl">{item.total}</h1>
              <p className="text-muted-foreground mt-2 text-md text-center">{item.text}</p>
            </div>
          )
        })}

      </section>
    </Container>
  )
}

export default Statistik