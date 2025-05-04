import React from 'react'
import Container from '../../globals/Container'
import loginImg from '@/assets/images/loginImg.png'
import Logo from '@/components/landing/Navbar/Logo'

import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

import InputForm from '@/components/form/InputForm'
import PasswordInput from '@/components/form/PasswordInput'

const LoginPage : React.FC = () => {

  return (
    <Container className='flex items-center flex-col justify-center py-10'>
      <section className='w-full h-full grid grid-cols-1 xl:grid-cols-2 border rounded-xl'>

        <main className='col-span-1 px-10 py-10 xl:py-0 lg:px-20 flex flex-col items-start justify-center h-full'>
          <Logo />
          <h1 className='text-foreground dark:text-white font-semibold text-3xl lg:text-4xl mt-2'>Selamat Datang Kembali</h1>
          <h5 className='text-muted-foreground mt-2 '>Silahkan masuk menggunakan akun Anda untuk mengakses halaman utama Anda.</h5>

          <form className='mt-6 w-full flex flex-col gap-y-4'>
            <InputForm label='Email' name='email' type='email' placeholder='johndoe@gmail.com' />
            <PasswordInput />

            <Button type='submit' className='text-white text-center'>Login</Button>
            <p className='text-center text-sm text-muted-foreground'>Belum punya akun? <Link to='/register' className='text-foreground underline'>Daftar Disini</Link></p>
          </form>
        </main>

        <main className='col-span-1 hidden xl:flex items-center justify-end'>
          <img src={loginImg} className='h-[550px]' />
        </main>

      </section>
    </Container>
  )
}

export default LoginPage