import { Card } from '@/components/ui/card'
import { ArrowRight, Book } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const SummaryCard = ({data} : {data: any}) => {
  return (
    <section className='w-full grid grid-cols-12 mt-4 gap-x-4 gap-y-4'>
        {data.map((item: any, index: number) => {
          return (
            <Card key={index} className='col-span-6 lg:col-span-3 p-4 bg-primary-foreground dark:bg-card'>
              <section className='flex flex-row items-start justify-start gap-x-4'>
                <Book className='h-10 w-10 border p-2 rounded bg-primary dark:bg-transparent stroke-white' />
                <div>
                  <h1 className='text-xl lg:text-2xl font-bold'>{item.value} Buku</h1>
                  <p className='text-muted-foreground text-sm'>{item.title}</p>
                </div>
              </section>
              <Separator className='w-full mt-2 mb-0' />
              <section className='w-full flex flex-row justify-between mt-0'>
                <p className='text-sm m-0 text-muted-foreground'>Lihat Detail</p>
                <ArrowRight className='stroke-muted-foreground' size={18} />
              </section>
            </Card>
          )
        })}
    </section>
  )
}

export default SummaryCard