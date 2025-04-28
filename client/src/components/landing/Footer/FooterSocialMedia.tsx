import React from 'react'
import { Facebook, Instagram, Twitter } from 'lucide-react'

const FooterSocialMedia : React.FC = () => {
  return (
    <div className='flex items-center gap-x-6 lg:gap-x-2 mb-4 lg:mb-0'>
      <Facebook className='w-8 h-8  bg-muted-foreground p-1 rounded stroke-white'  />
      <Instagram className='w-8 h-8 bg-muted-foreground p-1 rounded stroke-white'  />
      <Twitter className='w-8 h-8 bg-muted-foreground p-1 rounded stroke-white'  />
    </div>
  )
}

export default FooterSocialMedia