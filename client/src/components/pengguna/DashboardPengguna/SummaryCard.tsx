import { Card } from '@/components/ui/card'
import { ArrowRight, Book } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const SummaryCard = () => {
  return (
    <section className='w-full flex gap-x-4 mt-4'>
        {Array.from({length: 4}).map((_, index) => {
          return (
            <Card key={index} className='w-1/4 p-4 bg-primary-foreground dark:bg-card'>
              <section className='flex flex-row items-start justify-start gap-x-4'>
                <Book className='h-10 w-10 border p-2 rounded bg-primary dark:bg-transparent stroke-white' />
                <div>
                  <h1 className='text-2xl font-bold tracking-widest'>100</h1>
                  <p className='text-muted-foreground text-sm'>Buku Dipinjam</p>
                </div>
              </section>
              <Separator className='w-full mt-2 mb-0' />
              <section className='w-full flex flex-row justify-between mt-0'>
                <p className='text-sm m-0 text-muted-foreground'>See details</p>
                <ArrowRight className='stroke-muted-foreground' size={18} />
              </section>
            </Card>
          )
        })}
    </section>
  )
}

export default SummaryCard