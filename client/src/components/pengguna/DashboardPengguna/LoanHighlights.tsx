import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

const LoanHighlights = () => {
  return (
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

        <ScrollArea className="w-1/3 h-[350px] rounded-xl border bg-card">
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
      </section>
  )
}

export default LoanHighlights