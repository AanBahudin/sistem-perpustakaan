import { Button } from '@/components/ui/button'
import React from 'react'

const BookGrid = () => {
  return (
    <section className='w-full grid grid-cols-12 gap-6'>
      {Array.from({length: 10}).map((_, index) => {
        return (
          <main key={index} className='col-span-6 bg-card p-4 flex gap-x-4 rounded-xl border'>
            <img src="https://res.cloudinary.com/dhthnjizr/image/upload/v1746590828/ybtknqtmtdtjfnhmoarf.jpg" className='w-32 rounded object-cover' alt="" />

            <div className='flex items-start justify-between flex-col'>
              <h1 className='text-lg font-semibold'>Deep Work</h1>
              <p className='capitalize italic text-sm text-muted-foreground text-ellipsis w-full'>{"cara berhasil fokus di dunia yang ramai dan penuh gangguan".slice(0,40)}...</p>
              <p className='text-muted-foreground text-sm my-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis obcaecati odit eos dicta, officia reiciendis cupiditate, </p>

              <Button className='text-white text-sm self-start' size='sm'>Selengkapnya</Button>
            </div>
          </main>
        )
      })}

    </section>
  )
}

export default BookGrid