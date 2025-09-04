import Container from '@/globals/Container'
import { Outlet } from 'react-router-dom'
import ProdiSidebar from '@/components/Prodi/Sidebar/ProdiSidebar'
import ProdiNavbar from '@/components/Prodi/Navbar/ProdiNavbar'

const DashboardLayout = () => {
  return (
    <Container className='w-full h-[100vh] flex items-start'>
      {/* sidebar */}
      <ProdiSidebar />
      
      <section className='flex-1 max-h-[100vh] flex flex-col'>
        <ProdiNavbar />
        <section className='w-full min-h-[88vh] relative overflow-y-auto scroll-custom p-10'>
          <Outlet />
        </section>
      </section>
    </Container>
  )
}

export default DashboardLayout