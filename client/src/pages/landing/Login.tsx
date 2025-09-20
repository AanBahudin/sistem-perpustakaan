import React from 'react'
import Container from '../../globals/Container'
import loginImg from '@/assets/images/loginImg.png'
import Logo from '@/components/landing/Navbar/Logo'

import { Link, redirect, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import InputForm from '@/components/form/InputForm'
import PasswordInput from '@/components/form/PasswordInput'
import { accountStatus, loginAction } from '@/actions/authActions'
import { Button } from '@/components/ui/button'

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

  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: (data: FormData) => loginAction(data),
    onSuccess: (data: any) => {
      toast('Login Berhasil')
      const {verifikasiEmail, verifikasiProdi} = data
      if (verifikasiEmail && verifikasiProdi) {
        navigate('/my')
      } else {
        navigate('/status/account')
      }
      
    },
    onError: (error: any) => {
      const errMsg = error.response.data.message || 'Gagal Masuk, Coba lagi nanti'
      toast('Tidak dapat melakukan login', {description: errMsg})
    }
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    mutation.mutate(formData)
  }

  const isLoading = mutation.isPending

  return (
    <Container className='flex items-center flex-col justify-center py-10'>
      <section className='w-full h-full grid grid-cols-1 xl:grid-cols-2 border rounded-xl'>

        <main className='col-span-1 px-10 py-10 xl:py-0 lg:px-20 flex flex-col items-start mt-10 justify-center h-full'>
          <Logo />
          <h1 className='text-foreground dark:text-white font-semibold text-3xl lg:text-4xl mt-2'>Selamat Datang Kembali</h1>
          <h5 className='text-muted-foreground mt-2 '>Silahkan masuk menggunakan akun Anda untuk mengakses halaman utama Anda.</h5>

          <form className='w-full' onSubmit={handleSubmit}>
            <div className='mt-6 w-full flex flex-col gap-y-4'>
              <InputForm label='Email' name='email' type='email' placeholder='johndoe@gmail.com'  />
              <PasswordInput />

              <Button disabled={isLoading} type='submit' className='text-white text-center capitalize w-full' >
                {isLoading ? 'Loading...' : 'Masuk'}
              </Button>
              <p className='text-center text-sm text-muted-foreground'>Belum punya akun? <Link to='/register' className='text-foreground underline'>Daftar Disini</Link></p>
            </div>
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