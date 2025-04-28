
import React from 'react'
import { Separator } from '../ui/separator'
import { landingNavbarLink } from '@/utils/links'
import { BookOpenText } from 'lucide-react'

const Footer : React.FC = () => {
  return (
    <main className='mt-10 bg-muted p-10'>
      <section className='grid grid-cols-2'>
        
        <div className=''>
          <main className='flex items-center gap-x-4'>
            <div className='w-10 h-10 rounded-md bg-primary flex items-center justify-center'>
              <BookOpenText className="text-white" />
            </div>
            <p className=''>Perpustakaan Teknik Informatika</p>
          </main>
          <h5 className='w-[70%] text-sm mt-6 text-muted-foreground'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere, dicta! Labore ullam unde amet minima adipisicing elit. Facere, dicta! Labore ullam unde amet minima?</h5>
        </div>

        <div className='flex justify-end gap-x-6 '>
          {landingNavbarLink.map(item => {
            return (
              <a href={item.url} key={item.id} className='capitalize font-medium text-muted-foreground'>{item.text}</a>
            )
          })}
        </div>
      </section>

      <Separator className='my-6' />

      <section className='flex justify-between items-center'>
        <h1>Social media logo</h1>
        <h1 className='text-muted-foreground text-sm'>© 2025 Perpustakaan Teknik Informatika. All rights reserved.</h1>
      </section>

    </main>
  )
}

export default Footer