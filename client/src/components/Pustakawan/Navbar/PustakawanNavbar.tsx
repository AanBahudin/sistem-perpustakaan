import { ModeToggle } from '@/components/navbar/modeToggle'
import { store } from '@/store'
import { PanelRightOpen } from 'lucide-react'
import { useSelector } from 'react-redux'
import { setShowSidebar } from '@/cart/pustakawanSidebar'
import { useQuery } from '@tanstack/react-query'
import { getProfilePustakawan } from '@/actions/Pustakawan/pustakawanProfileActions'
import { Skeleton } from '@/components/ui/skeleton'

const PustakawanNavbar = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['profil'],
    queryFn: getProfilePustakawan
  })

  const {showSidebar} = useSelector((state: any) => state.pustakawanSidebarState)
  const handleSidebar = () => {
    store.dispatch(setShowSidebar(!showSidebar))
  }

  return (
    <section className='w-full sticky h-[12vh] border-b flex items-center justify-between p-6'>
        <PanelRightOpen 
          onClick={handleSidebar} 
          className={`w-5 h-5 stroke-muted-foreground hover:stroke-white duration-300 ease-in-out ${!showSidebar ? 'rotate-180' : 'rotate-0'}`} />

        <main className='flex w-fit items-center gap-x-10'>
          <ModeToggle />
          
          {isLoading ? (
            <Skeleton className='rounded-full w-7 h-7' />
          ) : 
            data.fotoProfil ? (
              <img className='rounded-full w-7 h-7 bg-muted flex items-center justify-center text-muted-foreground font-semibold' src={data.fotoProfil} alt={data.nama} />
            ) : (
              <div className='rounded-full w-7 h-7 bg-muted flex items-center justify-center text-muted-foreground font-semibold hover:border-2 duration-200 ease-in-out cursor-default'>{data.nama[0]}</div>
            )}
      
        </main>
    </section>
  )
}

export default PustakawanNavbar