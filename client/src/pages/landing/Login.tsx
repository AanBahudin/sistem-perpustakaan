import React from 'react'
import Container from '../../globals/Container'
import loginImg from '@/assets/images/loginImg.png'
import Logo from '@/components/landing/Navbar/Logo'

import { Link, redirect } from 'react-router-dom'

import InputForm from '@/components/form/InputForm'
import PasswordInput from '@/components/form/PasswordInput'
import SubmitButton from '@/components/form/SubmitButton'
import FormContainer from '@/components/form/FormContainer'
import { accountStatus, loginAction } from '@/actions/authActions'

export const loader = async() => {
  try {
    const {nama} = await accountStatus()
    if (nama) {
      return redirect('/status/account')
    }
  } catch (error) {
    return null
  }
  
  return
}

const LoginPage : React.FC = () => {
  return (
    <Container className='flex items-center flex-col justify-center py-10'>
      <section className='w-full h-full grid grid-cols-1 xl:grid-cols-2 border rounded-xl'>

        <main className='col-span-1 px-10 py-10 xl:py-0 lg:px-20 flex flex-col items-start mt-10 justify-center h-full'>
          <Logo />
          <h1 className='text-foreground dark:text-white font-semibold text-3xl lg:text-4xl mt-2'>Selamat Datang Kembali</h1>
          <h5 className='text-muted-foreground mt-2 '>Silahkan masuk menggunakan akun Anda untuk mengakses halaman utama Anda.</h5>

          <FormContainer action={loginAction}>
            <div className='mt-6 w-full flex flex-col gap-y-4'>
              <InputForm label='Email' name='email' type='email' placeholder='johndoe@gmail.com'  />
              <PasswordInput />

              <SubmitButton text='Login' />
              <p className='text-center text-sm text-muted-foreground'>Belum punya akun? <Link to='/register' className='text-foreground underline'>Daftar Disini</Link></p>
            </div>
          </FormContainer>
        </main>

        <main className='col-span-1 hidden xl:flex items-center justify-end'>
          <img src={loginImg} className='h-[550px]' />
        </main>

      </section>
    </Container>
  )
}

export default LoginPage