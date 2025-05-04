import React from 'react'
import Container from '../../globals/Container'
import loginImg from '@/assets/images/loginImg.png'

import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query'
import { customFetch } from '@/utils/customFetch'
import { AxiosResponse } from 'axios'
import InputForm from '@/components/form/InputForm'
import SelectForm from '@/components/form/SelectForm'
import PasswordInput from '@/components/form/PasswordInput'

export const loader = (queryClient : QueryClient) => async() => {
  const data : AxiosResponse = await queryClient.ensureQueryData({
    queryKey: ['testing'],
    queryFn: () => {
      customFetch.post('/auth/login', {
        email: 'aanbahudin11@gmail.com',
        password: 'sayaaan'
      })
    }
  })  
}

const Register : React.FC = () => {

  return (
    <Container className='flex items-center flex-col justify-center py-10'>
      <section className='w-full h-full grid grid-cols-1 xl:grid-cols-2 border rounded-xl'>

        <main className='col-span-1 px-10 py-10 xl:py-0 lg:px-20 flex flex-col items-start justify-center h-full'>
          {/* <Logo /> */}
          <h1 className='text-foreground dark:text-white font-semibold text-3xl lg:text-4xl mt-2'>Ayo Bergabung</h1>
          <h5 className='text-muted-foreground mt-2 '>Silahkan daftarkan akun anda untuk mengakses layanan perpustakaan Teknik Informatika</h5>

          <form className='mt-6 w-full flex flex-col gap-y-4'>

            <main className='grid grid-cols-1 lg:grid-cols-2 gap-x-2'>
              <InputForm label='Nama' name='nama' placeholder='John Doe' type='text' /> 
              <InputForm label='Email' name='email' placeholder='johndoe@gmail.com' type='email' /> 
            </main>

            <main className='grid grid-cols-2 gap-x-2'>
              <InputForm label='Nim / Nidn' name='idKampus' placeholder='3423232' type='number'  /> 
              <SelectForm label='Posisi' name='role' placeholder='Daftar sebagai' selectLabel='Pilih salah satu' values={['Dosen', 'Mahasiswa']} />
            </main>

            <PasswordInput />

            <Button type='submit' className='text-white text-center'>Daftar</Button>
            <p className='text-center text-sm text-muted-foreground'>Sudah punya akun? <Link to='/login' className='text-foreground underline'>Masuk Disini</Link></p>
          </form>
        </main>

        <main className='col-span-1 hidden xl:flex items-center justify-end'>
          <img src={loginImg} className='h-[550px]' />
        </main>

      </section>
    </Container>
  )
}

export default Register