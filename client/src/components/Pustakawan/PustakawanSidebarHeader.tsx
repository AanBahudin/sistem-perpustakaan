import Logo from "../landing/Navbar/Logo"
import { Link } from "react-router-dom"

const PustakawanSidebarHeader = () => {
  return (
    <section className='w-full flex items-start gap-x-5'>
        <Logo />
        <div className='flex-1'>
          <Link to='/pustakawan/profil' className='text-sm font-bold ch3apitalize hover:underline cursor-pointer duration-300 ease-in-out'>Pustakawan 1</Link>
          <h3 className='text-muted-foreground text-xs truncate'>aan.bahudin11@gmail.com</h3>
        </div>
    </section>
  )
}

export default PustakawanSidebarHeader