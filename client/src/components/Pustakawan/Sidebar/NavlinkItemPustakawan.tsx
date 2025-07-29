import { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import PustakawanCollapseNavlinkItem from './PustakawanCollapseNavlinkItem'

type NavlinkItemPustakawanType = {
  data: any
}

const NavlinkItemPustakawan = ({ data }: NavlinkItemPustakawanType) => {
  const Icons: LucideIcon = data?.icon

  if (data.type === 'collapse') {
    // Jangan bungkus dengan NavLink kalau tipe collapse
    return <PustakawanCollapseNavlinkItem data={data} isActive={false} />
  }

  // Normal NavLink untuk link biasa
  return (
    <NavLink
      to={data.url}
      key={data.title}
      end={data.title === 'Dashboard'}
      className={({ isActive }) =>
        `w-full flex items-center gap-x-4 py-3 px-2 rounded ${
          isActive ? 'bg-primary/30' : 'hover:bg-muted duration-200 ease-in-out'
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
}

export default NavlinkItemPustakawan
