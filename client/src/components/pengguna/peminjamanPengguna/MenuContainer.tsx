import { dataMenuLinks } from '@/utils/constants'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const MenuContainer = () => {

  const pathname = useLocation().pathname.split('/').pop()

  return (
    <section className='mt-20 flex flex-col gap-y-4'>
        {dataMenuLinks.map(item => {
            return (
                <Link to={item.title} key={item.id} className='flex gap-x-4 items-center justify-start'>
                    {item.icon}
                    <p className={`capitalize ${pathname === item.title ? 'text-primary' : ''}`}>{item.title}</p>
                </Link>
            )
        })}
    </section>
  )
}

export default MenuContainer 