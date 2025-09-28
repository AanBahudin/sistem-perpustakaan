import Container from '@/globals/Container'
import PustakawanNavbar from '@/components/Pustakawan/Navbar/PustakawanNavbar'
import PustakawanSidebar from '@/components/Pustakawan/Sidebar/PustakawanSidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {

  return (
    <Container className='w-full h-[100vh] flex items-start'>
      {/* sidebar */}
      <PustakawanSidebar />
      
      <section className='flex-1 max-h-[100vh] flex flex-col'>
        <PustakawanNavbar />
        <section className='w-full min-h-[88vh] relative overflow-y-auto scroll-custom p-10'>
          <Outlet />
        </section>
      </section>
    </Container>
  )
}

export default DashboardLayout