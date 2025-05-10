import React from 'react'
import { Separator } from '@/components/ui/separator'

const StatusProfilePage = () => {
  return (
     <section className='w-full grid-cols-9 flex flex-col justify-start'>
      <h1 className='w-full text-3xl font-semibold'>Status</h1>
      <Separator className='my-2' />
      <p className='text-muted-foreground'>Kelola informasi keamanan akun seperti kata sandi dan status verifikasi email atau program studi.</p>
    </section>
  )
}

export default StatusProfilePage