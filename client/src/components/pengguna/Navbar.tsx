import Logo from '../landing/Navbar/Logo'
import { ModeToggle } from '../navbar/modeToggle'
import NavSearch from './NavSearch'
import NavbarPenggunaDropdown from './NavbarPenggunaDropdown'

const Navbar = () => {
  return (
    <nav className='w-full py-8 border-b border-accent '>
        <section className='w-[90%] mx-auto flex items-center justify-between '>
          <Logo />

          <NavSearch />

          {/* menu section */}
          <div className='flex items-center justify-center lg:gap-x-10 gap-x-6'>
            <ModeToggle />
            <NavbarPenggunaDropdown />
          </div>

        </section>

    </nav>
  )
}

export default Navbar