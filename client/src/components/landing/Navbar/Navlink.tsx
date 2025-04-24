import React from 'react'
import { landingNavbarLink } from '@/utils/links'

const Navlink : React.FC = () => {
  return (
     <div className='lg:flex hidden items-center justify-center gap-x-6'>
        {landingNavbarLink.map(item => {
        return (
            <a href={item.url} key={item.id} className='capitalize font-medium'>{item.text}</a>
        )
        })}
    </div>
  )
}

export default Navlink