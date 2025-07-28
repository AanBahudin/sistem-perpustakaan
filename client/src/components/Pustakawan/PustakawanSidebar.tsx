import PustakawanSidebarLink from './PustakawanSidebarLink'
import PustakawanSidebarHeader from './PustakawanSidebarHeader'
import PustakawanSidebarFooter from './PustakawanSidebarFooter'

const PustakawanSidebar = () => {
  return (
    <section className='w-[18%] h-[100vh] flex items-start flex-col overflow-y-auto scroll-custom border-r p-6'>
      <PustakawanSidebarHeader />
      <PustakawanSidebarLink />
      <PustakawanSidebarFooter />
    </section>
  )
}

export default PustakawanSidebar