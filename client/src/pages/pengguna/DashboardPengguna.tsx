import Container from '../../globals/Container'
import { Card } from '@/components/ui/card'
import { ArrowRight, Book } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import TablePengguna from '@/components/pengguna/TablePengguna'
import CalendarPengguna from '@/components/pengguna/CalendarUser'
import { ScrollArea } from '@/components/ui/scroll-area'
import PenggunaCharts from '@/components/pengguna/PenggunaCharts'

const KatalogPengguna = () => {
  return (
    <Container className='mt-16'>
      <h1 className='text-3xl font-semibold'>Data Overview</h1>

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

      <section className='w-full grid grid-cols-12 mt-6'>
        {/* TABLE */}
        <div className='w-full col-span-9 bg-primary-foreground dark:bg-card rounded-xl border'>
          <TablePengguna />
        </div>

        <div className='col-span-3 w-fit place-self-center bg-primary-foreground dark:bg-card rounded-xl border'>
          <CalendarPengguna />
        </div>
        
      </section>

      <section className='w-full flex gap-x-8 my-6'>
        <div className='w-1/3 border bg-card rounded-xl p-6'>
          <h3>Total Denda</h3>

          <h1 className='text-2xl mt-4 font-semibold text-white'>IDR 150.000</h1>
          <p className='text-muted-foreground text-sm mb-6'>+20.1% dari pengembalian terakhir</p>
          <PenggunaCharts />
        </div>

        <div className='w-2/3 border rounded-xl'>
          <h1></h1>
        </div>
      </section>

      <section className='w-full my-10 flex gap-x-6'>
        <div className='w-2/3 h-fit bg-card rounded-xl border p-4'>
          <h1 className='text-2xl font-semibold'>Terakhir Kali Dipinjam</h1>

          <main className='w-full flex gap-x-6 col-span-9'>
            {Array.from({length: 4}).map((_, index) => {
              return (
                <div key={index} className='w-1/3 p-2 border mt-6 rounded'>
                  <img className='w-full h-[200px] object-fill grayscale-75' src='https://res.cloudinary.com/dhthnjizr/image/upload/v1746458440/xcygxqv3pt4gzfno2h4z.jpg' alt="" />
                  <p className='text-sm text-muted-foreground mt-2'>Clean Architecture</p>
                </div>
              )
            })}
          </main>
        </div>

        {/* <div className='w-full flex-1'> */}
        <ScrollArea className="w-1/3 h-[350px] rounded-xl border">
          <div className="p-4">
            <h4 className="mb-8 text-md font-medium leading-none">Deadline Pengembalian</h4>
            {Array.from({length: 3}).map((_, index) => (
              <>
                <div key={index} className="text-sm flex justify-between">
                  <h1>Clean Architecture</h1>
                  <p className='text-muted-foreground'>3 Hari Lagi</p>
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
        {/* </div> */}
      </section>

      
    </Container>
  )
}

export default KatalogPengguna