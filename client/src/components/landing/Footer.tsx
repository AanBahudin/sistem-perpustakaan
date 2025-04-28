import React from 'react'
import { Separator } from '../ui/separator'
import FooterLink from './Footer/FooterLink'
import FooterSocialMedia from './Footer/FooterSocialMedia'
import Logo from './Navbar/Logo'

const Footer : React.FC = () => {
  return (
    <main className='mt-10 bg-muted p-10'>
      <section className='grid grid-cols-1 lg:grid-cols-2'>
        
        <div className=''>
          <main className='flex items-center gap-x-4'>
            <Logo />
            <p className=''>Perpustakaan Teknik Informatika</p>
          </main>

          <h5 className='w-full lg:w-[70%] text-sm mt-6 text-muted-foreground'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere, dicta! Labore ullam unde amet minima adipisicing elit. Facere, dicta! Labore ullam unde amet minima?</h5>
        </div>

        <FooterLink />
      </section>
      <Separator className='my-6' />
      <section className='flex flex-col lg:flex-row gap-y-2 lg:gap-y-0 justify-between items-center'>
        <FooterSocialMedia />
        <h1 className='text-muted-foreground text-sm'>© 2025 Perpustakaan Teknik Informatika. All rights reserved.</h1>
      </section>

    </main>
  )
}

export default Footer