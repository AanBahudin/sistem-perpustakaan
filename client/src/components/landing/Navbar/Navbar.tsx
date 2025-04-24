import React from 'react'
import Navlink from './Navlink'
import { BookOpenText } from 'lucide-react'
import { ModeToggle } from '@/components/navbar/modeToggle'
import { Button } from '@/components/ui/button'
import NavbarDropdown from '../NavbarDropdown'

const Navbar : React.FC= () => {
  return (
    <nav className='w-full py-8 border-b border-accent '>
        <section className='w-[90%] mx-auto flex items-center justify-between '>
          <div className='w-10 h-10 rounded-md bg-primary flex items-center justify-center'>
            <BookOpenText className="text-white" />
          </div>

          {/* menu section */}
          <div className='flex items-center justify-center lg:gap-x-10 gap-x-6'>
            <Navlink />
            <ModeToggle />
            <NavbarDropdown />
            <Button className='hidden lg:block text-white px-10 '>Masuk</Button>

          </div>

        </section>

    </nav>  
  )
}

export default Navbar