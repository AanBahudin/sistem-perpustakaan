import React from 'react'
import { Separator } from '@/components/ui/separator'
import ProfileData from '@/components/pengguna/ProfilPengguna/ProfileData'
import { Input } from '@/components/ui/input'

const CredentialsProfilePage = () => {
  return (
    <section className='w-full grid-cols-9 flex flex-col justify-start'>
      <h1 className='w-full text-2xl font-semibold'>Keamanan</h1>
      <Separator className='my-2' />
      <p className='text-muted-foreground'>Informasi keamanan akun </p>

      <main className='w-2/3 gap-4 mt-10'>
        <ProfileData label='Password' value='Aan Bahudin' isEditable={true} />
      </main>

      <h1 className='w-full text-2xl font-semibold mt-10'>Status Akun</h1>
      <Separator className='my-2' />

      <main className='w-full flex flex-col gap-y-8 my-8'>

        <div className='flex flex-col items-start'>
          <h3>Status Akun</h3>
          <p className='text-muted-foreground text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, nesciunt.</p>
          <p className='text-sm text-center w-1/6 px-6 bg-primary py-2 rounded mt-4 border-spacing-7'>Aktif</p>
        </div>

        <div className='flex flex-col items-start'>
          <h3>Verifikasi Email</h3>
          <p className='text-muted-foreground text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, nesciunt.</p>
          <p className='text-sm text-center w-1/6 px-6 bg-primary py-2 rounded mt-4 border-spacing-7'>Tervefikasi</p>
        </div>

         <div className='flex flex-col items-start'>
          <h3>Verifikasi Program Studi</h3>
          <p className='text-muted-foreground text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, nesciunt.</p>
          <p className='text-sm text-center w-1/6 px-6 bg-primary py-2 rounded mt-4 border-spacing-7'>Tervefikasi</p>
        </div>
      </main>

    </section>
  )
}

export default CredentialsProfilePage