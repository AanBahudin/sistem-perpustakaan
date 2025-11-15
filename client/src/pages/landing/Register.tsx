import React from 'react'
import Container from '../../globals/Container'

import { Link } from 'react-router-dom'
import InputForm from '@/components/form/InputForm'
import SelectForm from '@/components/form/SelectForm'
import PasswordInput from '@/components/form/PasswordInput'
import { registerSelectInput } from '@/utils/SelectInputValue'
import { Button } from '@/components/ui/button'
import useRegisterPengguna from '@/hooks/fetchHooks/penggunaHooks/authHooks/useRegisterPengguna'

const Register : React.FC = () => {

  const {isLoading, mutationFn} = useRegisterPengguna()
  const imageURL : string = 'https://res.cloudinary.com/dhthnjizr/image/upload/v1745905005/k861oq846rph9u5b1oh3.jpg'


  return (
    <Container className='flex items-center flex-col justify-center py-10 mt-20'>
      <section className='w-full h-full grid grid-cols-1 xl:grid-cols-3  rounded-xl'>

        <main className='col-span-2 bg-[url("/images/callToAction.png")] rounded-l-xl object-contain bg-center px-10 py-10 xl:py-0 lg:px-20 flex flex-col items-start justify-center h-full'>
          {/* <Logo /> */}
          <h1 className='text-primary dark:text-white font-bold text-3xl lg:text-4xl mt-2'>Ayo Bergabung</h1>
          <h5 className='text-muted-foreground mt-2 '>Silahkan daftarkan akun anda untuk mengakses layanan perpustakaan Teknik Informatika</h5>

          <form onSubmit={mutationFn} className='static w-full'>
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

              <Button disabled={isLoading} type='submit' className='text-white text-center capitalize w-full'>
                {isLoading ? 'Loading...' : 'Daftar'}
              </Button>
              <p className='text-center text-sm text-muted-foreground'>Sudah punya akun? <Link to='/login' className='text-foreground underline'>Masuk Disini</Link></p>
            </div>
          </form>
        </main>

        <main className='col-span-1 hidden xl:flex items-center justify-end'>
          <img src={imageURL} className='h-[550px] object-cover rounded-r-xl' />
        </main>

      </section>
    </Container>
  )
}

export default Register