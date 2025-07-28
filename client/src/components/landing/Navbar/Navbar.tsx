import React from 'react'
import Navlink from './Navlink'
import { ModeToggle } from '@/components/navbar/modeToggle'
import { Button } from '@/components/ui/button'
import NavbarDropdown from './NavbarDropdown'
import Logo from './Logo'
import { Link } from 'react-router-dom'

const Navbar : React.FC= () => {
  return (
    <nav className='w-full py-8 border-b border-accent '>
        <section className='w-[90%] mx-auto flex items-center justify-between '>
          <Logo />

          {/* menu section */}
          <div className='flex items-center justify-center lg:gap-x-10 gap-x-6'>
            <Navlink />
            <ModeToggle />
            <NavbarDropdown />
            <Button asChild className='hidden lg:block text-white px-10 '>
              <Link to='/login'>Masuk</Link>
            </Button>
          </div>

        </section>

    </nav>  
  )
}

export default Navbar