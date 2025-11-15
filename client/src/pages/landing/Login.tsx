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
  const imageURL : string = 'https://res.cloudinary.com/dhthnjizr/image/upload/v1745905005/k861oq846rph9u5b1oh3.jpg'

  return (
    <Container className='flex mt-20 items-center flex-col justify-center py-10'>
      <section className='w-full h-full grid grid-cols-1 xl:grid-cols-3'>

        <main className='col-span-2 bg-[url("/images/callToAction.png")] rounded-l-xl object-contain bg-center px-10 py-10 xl:py-0 lg:px-20 flex flex-col items-start justify-center h-full'>
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
        </main>

        <main className='col-span-1 hidden xl:flex items-center justify-end'>
          <img src={imageURL} className='h-[550px] rounded-r-xl' />
        </main>

      </section>
    </Container>
  )
}

export default LoginPage