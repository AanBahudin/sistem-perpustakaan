import React from 'react'
import { BookOpenText } from 'lucide-react'
import { landingNavbarLink } from '../../../utils/links'
import { ModeToggle } from '@/components/navbar/modeToggle'
import { Separator } from '@/components/ui/separator'

const Navbar : React.FC= () => {
  return (
    <nav className='w-full py-8 border-b border-accent '>
        <section className='w-[90%] mx-auto flex items-center justify-between '>
          <div className='w-10 h-10 rounded-md bg-primary flex items-center justify-center'>
            <BookOpenText className="text-white" />
          </div>

          {/* menu section */}
          <div className='flex items-center justify-center gap-x-10'>
            <div className='flex items-center justify-center gap-x-6'>
              {landingNavbarLink.map(item => {
                return (
                  <a href={item.text} key={item.id} className='capitalize font-medium'>{item.text}</a>
                )
              })}
            </div>
            <ModeToggle />
            <button className='bg-primary px-6 py-1 rounded-md font-semibold text-white'>Masuk</button>
          </div>

        </section>

    </nav>  
  )
}

export default Navbar