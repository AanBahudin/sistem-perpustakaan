import React, { useState } from 'react'
import Container from '../../globals/Container'
import loginImg from '@/assets/images/loginImg.png'
import Logo from '@/components/landing/Navbar/Logo'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Link } from 'react-router-dom'

const LoginPage : React.FC = () => {
  const [showPass, setShowPass] = useState<Boolean>(false)
  return (
    <Container className='flex items-center flex-col justify-center py-10'>
      <section className='w-full h-full grid grid-cols-1 xl:grid-cols-2 border rounded-xl'>

        <main className='col-span-1 px-10 py-10 xl:py-0 lg:px-20 flex flex-col items-start justify-center h-full'>
          <Logo />
          <h1 className='text-foreground dark:text-white font-semibold text-3xl lg:text-4xl mt-2'>Selamat Datang Kembali</h1>
          <h5 className='text-muted-foreground mt-2 '>Silahkan masuk menggunakan akun Anda untuk mengakses halaman utama Anda.</h5>

          <form className='mt-6 w-full flex flex-col gap-y-4'>
            <div className="grid items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="johndoe@gmail.com" className='mt-2' />
            </div>

            <div className="grid items-center gap-1.5">
              <Label htmlFor="email">Password</Label>
              <Input type={showPass ? 'text' : 'password'} id="password" placeholder="****" className='mt-2' />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" onCheckedChange={() => setShowPass(!showPass)} />
              <label htmlFor="terms" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Show Password
              </label>
            </div>

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