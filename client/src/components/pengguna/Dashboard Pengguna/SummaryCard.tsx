import { Card } from '@/components/ui/card'
import { ArrowRight, BookCheck, BookDown, BookUp, BookUp2, BookX, LucideIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router-dom'

const SummaryCard = ({data} : {data: any}) => {

  const SummaryCardIcon : Array<LucideIcon> = [
    BookUp,
    BookCheck,
    BookUp2,
    BookDown,
    BookX
  ]

  const link = ['peminjaman', 'peminjaman?statusPeminjaman=Dipinjam', 'perpanjangan', 'pengembalian']

  return (
    <section className='w-full grid grid-cols-12 lg:grid-cols-5 mt-4 gap-x-4 gap-y-4'>
        {data.map((item: any, index: number) => {
          const Icon = SummaryCardIcon[index]
          return (
            <Card key={index} className='col-span-6 hover:shadow-md dark:hover:shadow-primary/60 duration-200 ease-in-out lg:col-span-1 p-4 bg-primary/20 rounded-2xl '>
              <section className='flex flex-row items-start justify-start gap-x-4'>
                <Icon className='h-10 w-10 border p-2 rounded-full bg-primary/20 dark:bg-transparent stroke-primary' />
                <div>
                  <h1 className='text-lg lg:text-xl font-bold first:text-primary'>{item.value} Buku</h1>
                  <p className='text-muted-foreground text-[12px] first:text-primary'>{item.title}</p>
                </div>
              </section>
              <Separator className='w-full mt-2 mb-0 border border-primary/70' />
              <Link to={`/my/data/${link[index]}`} className='w-full flex flex-row justify-between mt-0 group'>
                <p className='text-[12px] m-0 text-muted-foreground group-hover:underline'>Lihat Detail</p>
                <ArrowRight className='stroke-muted-foreground' size={18} />
              </Link>
            </Card>
          )
        })}
    </section>
  )
}

export default SummaryCard