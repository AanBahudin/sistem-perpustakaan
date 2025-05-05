import React from 'react'
import Container from '../../globals/Container'
import loginImg from '@/assets/images/loginImg.png'

import { Link, redirect } from 'react-router-dom'
import InputForm from '@/components/form/InputForm'
import SelectForm from '@/components/form/SelectForm'
import PasswordInput from '@/components/form/PasswordInput'
import { registerSelectInput } from '@/utils/SelectInputValue'
import FormContainer from '@/components/form/FormContainer'
import { accountStatus, registerAction } from '@/actions/authActions'
import SubmitButton from '@/components/form/SubmitButton'

export const loader = async() => {
  try {
    const {nama} = await accountStatus()
    if (nama) {
      return redirect('/status/account')
    }
  } catch (error) {
    return null
  }
}

const Register : React.FC = () => {

  return (
    <Container className='flex items-center flex-col justify-center py-10'>
      <section className='w-full h-full grid grid-cols-1 xl:grid-cols-2  rounded-xl'>

        <main className='col-span-1 px-10 py-10 xl:py-0 lg:px-20 flex flex-col items-start justify-center h-full'>
          {/* <Logo /> */}
          <h1 className='text-foreground dark:text-white font-semibold text-3xl lg:text-4xl mt-2'>Ayo Bergabung</h1>
          <h5 className='text-muted-foreground mt-2 '>Silahkan daftarkan akun anda untuk mengakses layanan perpustakaan Teknik Informatika</h5>

          <FormContainer action={registerAction}>
            <div className='mt-6 w-full flex flex-col gap-y-4'>

              <main className='grid grid-cols-1 lg:grid-cols-2 gap-x-2'>
                <InputForm label='Nama' name='nama' placeholder='John Doe' type='text' /> 
                <InputForm label='Email' name='email' placeholder='johndoe@gmail.com' type='email' /> 
              </main>

              <main className='grid grid-cols-2 gap-x-2'>
                <InputForm label='Nim / Nidn' name='idKampus' placeholder='3423232' type='number'  /> 
                <SelectForm label='Posisi' name='role' placeholder='Daftar sebagai' selectLabel='Pilih salah satu' values={registerSelectInput} />
              </main>

              <PasswordInput />

              <SubmitButton text='Daftar' />
              <p className='text-center text-sm text-muted-foreground'>Sudah punya akun? <Link to='/login' className='text-foreground underline'>Masuk Disini</Link></p>
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

export default Register