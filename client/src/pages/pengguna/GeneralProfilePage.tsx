import { Separator } from '@/components/ui/separator'
import React from 'react'

const GeneralProfilePage = () => {
  return (
    <section className='w-full grid-cols-9 flex flex-col justify-start'>
      <h1 className='w-full text-3xl font-semibold'>Umum</h1>
      <Separator className='my-2' />
      <p className='text-muted-foreground'>Data profil utama yang digunakan untuk keperluan akademik dan identifikasi akun.</p>
    </section>
  )
}

export default GeneralProfilePage