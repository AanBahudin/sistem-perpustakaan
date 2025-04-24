import React from 'react'
import { BookOpenText } from 'lucide-react'
import { ModeToggle } from '@/components/navbar/modeToggle'
import Navlink from './Navlink'
import { Button } from '@/components/ui/button'

const Navbar : React.FC= () => {
  return (
    <nav className='w-full py-8 border-b border-accent '>
        <section className='w-[90%] mx-auto flex items-center justify-between '>
          <div className='w-10 h-10 rounded-md bg-primary flex items-center justify-center'>
            <BookOpenText className="text-white" />
          </div>

          {/* menu section */}
          <div className='flex items-center justify-center gap-x-10'>
            <Navlink />
            <ModeToggle />
            <Button className='text-white px-10'>Masuk</Button>
          </div>

        </section>

    </nav>  
  )
}

export default Navbar