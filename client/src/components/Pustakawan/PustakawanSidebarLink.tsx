import { pustakanSidebarMenu } from "@/utils/pustakawanSidebarMenu"
import { NavLink } from "react-router-dom"
import { LucideIcon } from "lucide-react"

const PustakawanSidebarLink = () => {
  return (
    <main className='w-full overflow-y-auto scroll-custom h-full flex-1 flex flex-col items-start gap-y-1 my-6'>
        {pustakanSidebarMenu.map((item: any, index: number) => {
          const Icons : LucideIcon = item.icon
          return (
            <NavLink
              to={item.url}
              key={index}
              end={item.title === 'Dashboard' ? true: false}
              className={({ isActive }) =>
                `w-full flex items-center gap-x-4 py-3 px-2 rounded ${
                  isActive ? 'bg-primary/30' : 'hover:bg-muted duration-200 ease-in-out'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icons className={`w-4 h-4 ${isActive ? 'stroke-white' : 'stroke-muted-foreground'}`} />
                  <p className={`text-sm ${isActive ? 'text-white font-bold' : 'text-muted-foreground'}`}>
                    {item.title}
                  </p>
                </>
              )}
            </NavLink>
          )
        })}
      </main>
  )
}

export default PustakawanSidebarLink