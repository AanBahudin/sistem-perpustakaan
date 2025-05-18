import { dataMenuLinks } from '@/utils/constants'
import React from 'react'
import { Link } from 'react-router-dom'

const MenuContainer = () => {
  return (
    <section className='mt-20 flex flex-col gap-y-4'>
        {dataMenuLinks.map(item => {
            return (
                <Link to={item.title} key={item.id} className='flex gap-x-4 items-center justify-start'>
                    {item.icon}
                    <p className='capitalize'>{item.title}</p>
                </Link>
            )
        })}
    </section>
  )
}

export default MenuContainer