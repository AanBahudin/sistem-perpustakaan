import React from 'react'
import Container from '../../globals/Container'
import Logo from '@/components/landing/Navbar/Logo'

import { Link } from 'react-router-dom'

import InputForm from '@/components/form/InputForm'
import PasswordInput from '@/components/form/PasswordInput'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import useLoginPengguna from '@/hooks/fetchHooks/penggunaHooks/authHooks/useLoginPengguna'


const LoginPage : React.FC = () => {

  const { isLoading, mutationFn } = useLoginPengguna()
  const imageURL : string = 'https://res.cloudinary.com/dhthnjizr/image/upload/v1745905005/2_axrxxk.png'

  return (
     <Container className='w-full flex items-center justify-center min-h-[100vh] mt-10'>
      <main className='w-[90%] relative flex items-center justify-between bg-[url("/images/callToAction.png")] rounded-l-xl object-contain bg-center py-4 px-10'>
 
      {/* LEFT SECTION */}
      <section className='flex-1'>
        <Logo />
          <h1 className=' dark:text-white text-primary font-bold text-3xl lg:text-4xl mt-2'>Selamat Datang Kembali</h1>
          <h5 className='text-muted-foreground mt-1 '>Silahkan masuk menggunakan akun Anda untuk mengakses halaman utama Anda.</h5>

          <form className='w-full' onSubmit={mutationFn}>
            <div className='mt-6 w-full flex flex-col gap-y-4'>
              <InputForm label='Email' name='email' type='email' placeholder='mahasiswa@gmail.com'  />
              <PasswordInput />

              <Button disabled={isLoading} type='submit' className='text-white text-center capitalize w-full flex items-center justify-center gap-x-4' >
                {isLoading && <Loader className='animate-spin' />}
                {isLoading ? 'Loading...' : 'Masuk'}
              </Button>
              <p className='text-center text-sm text-muted-foreground'>Belum punya akun? <Link to='/register' className='text-foreground underline'>Daftar Disini</Link></p>
            </div>
          </form>
      </section>

        {/* RIGHT SECTION */}
        <section className='w-fit flex flex-col justify-end items-end'>
          <img src={imageURL} className='h-[510px] top-[16px] left-14 relative rounded-r-xl' />
        </section>

      </main>
    </Container>
  )
}

export default LoginPage