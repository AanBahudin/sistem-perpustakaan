import { prodiSidebarMenu } from '@/utils/prodiSidebarMenu'
import { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import PustakawanCollapseNavlinkItem from '@/components/Pustakawan/Sidebar/PustakawanCollapseNavlinkItem'

const ProdiSidebarLink = () => {
  return (
    <section className='w-full overflow-y-auto scroll-custom h-full flex-1 flex flex-col items-start gap-y-1 my-12'>
      {prodiSidebarMenu.map((data: any, index: number) => {

        const Icons: LucideIcon = data?.icon
        if (data.type === 'collapse') {
          // Jangan bungkus dengan NavLink kalau tipe collapse
          return <PustakawanCollapseNavlinkItem data={data} key={index} />
        }

        return (
            <NavLink
              to={data.url}
              key={data.title}
              end={data.title === 'Dashboard'}
              className={({ isActive }) =>
                `w-full flex items-center gap-x-4 py-3 px-2 rounded ${
                  isActive ? 'bg-primary dark:bg-primary/30' : 'hover:bg-muted duration-200 ease-in-out'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icons
                    className={`w-4 h-4 ${
                      isActive ? 'stroke-white' : 'stroke-muted-foreground'
                    }`}
                  />
                  <p
                    className={`text-sm ${
                      isActive ? 'text-white font-bold' : 'text-muted-foreground'
                    }`}
                  >
                    {data.title}
                  </p>
                </>
              )}
            </NavLink>
          )
      })}
    </section>
  )
}

export default ProdiSidebarLink