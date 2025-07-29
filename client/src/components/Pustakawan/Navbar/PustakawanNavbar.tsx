import { ModeToggle } from '@/components/navbar/modeToggle'
import { store } from '@/store'
import { PanelRightOpen } from 'lucide-react'
import { useSelector } from 'react-redux'
import { setShowSidebar } from '@/cart/pustakawanSidebar'

const PustakawanNavbar = () => {

  const {showSidebar} = useSelector((state: any) => state.pustakawanSidebarState)
  const handleSidebar = () => {
    store.dispatch(setShowSidebar(!showSidebar))
  }


  return (
    <section className='w-full h-[12vh] border-b flex items-center justify-between p-6'>
        <PanelRightOpen 
          onClick={handleSidebar} 
          className={`w-5 h-5 stroke-muted-foreground hover:stroke-white duration-300 ease-in-out ${!showSidebar ? 'rotate-180' : 'rotate-0'}`} />

        <main className='flex w-fit items-center gap-x-10'>
          <ModeToggle />
          <div className='rounded-full w-7 h-7 bg-muted'></div>
        </main>
    </section>
  )
}

export default PustakawanNavbar