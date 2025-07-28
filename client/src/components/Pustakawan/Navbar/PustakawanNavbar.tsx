import { ModeToggle } from '@/components/navbar/modeToggle'
import { PanelRightOpen } from 'lucide-react'
import { useSelector } from 'react-redux'

const PustakawanNavbar = () => {

  const {} = useSelector((state: any) => state.pustakawanSidebarState)

  return (
    <section className='w-full h-[12vh] border-b flex items-center justify-between p-6'>
        <PanelRightOpen className='w-5 h-5 stroke-muted-foreground hover:stroke-white duration-300 ease-in-out' />

        <main className='flex w-fit items-center gap-x-10'>
          <ModeToggle />
          <div className='rounded-full w-7 h-7 bg-muted'></div>
        </main>
    </section>
  )
}

export default PustakawanNavbar