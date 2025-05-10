import React from 'react'
import { profileMenulinks } from '@/utils/constants'
import { Separator } from '@/components/ui/separator'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const MenuSection = () => {

  const pathname = useLocation().pathname.split('/').pop()

  return (
    <section className='col-span-3 border-r'>
      <div className='w-full flex flex-col items-start gap-y-2 pr-4'>
        {profileMenulinks.map(link => {
          const {url} = link
          const variant = url === pathname ? 'secondary' : 'ghost'
          return (
            <>
              <Button asChild variant={variant} className='w-full text-left flex items-start text-white justify-start' >
                <Link to={link.url} className='py-2 capitalize text-left'>{link.title}</Link>
              </Button>
              <Separator />
            </>
          )
        })}

      </div>
    </section>
  )
}

export default MenuSection