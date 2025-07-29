import PustakawanSidebarLink from './PustakawanSidebarLink'
import PustakawanSidebarHeader from './PustakawanSidebarHeader'
import PustakawanSidebarFooter from './PustakawanSidebarFooter'
import { useSelector } from 'react-redux'

const PustakawanSidebar = () => {

  const {showSidebar} = useSelector((state: any) => state.pustakawanSidebarState)

  return (
    <section className={`${
      showSidebar ? 'w-[18%] px-4 py-6' : 'w-0 p-0'
    } h-[100vh] flex items-start flex-col overflow-y-auto scroll-custom border-r transition-all duration-500 ease-in-out `}>
      <PustakawanSidebarHeader />
      <PustakawanSidebarLink />
      <PustakawanSidebarFooter />
    </section>
  )
}

export default PustakawanSidebar