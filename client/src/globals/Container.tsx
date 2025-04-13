import React from 'react'
import { cn } from '../lib/utils'

const Container = ({ children, className = '' } : {children: React.ReactNode, className?: string}) => {
  return (
    <section className={cn('w-[90%] mx-auto p-10', className)}>
        {children}
    </section>
  )
}

export default Container