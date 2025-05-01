import React, { useState } from 'react'
import Container from '../../globals/Container'
import loginImg from '@/assets/images/loginImg.png'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Link } from 'react-router-dom'

const Register : React.FC = () => {
  const [showPass, setShowPass] = useState<Boolean>(false)
  return (
    <Container className='flex items-center flex-col justify-center py-10'>
      <section className='w-full h-full grid grid-cols-1 xl:grid-cols-2 border rounded-xl'>

        <main className='col-span-1 px-10 py-10 xl:py-0 lg:px-20 flex flex-col items-start justify-center h-full'>
          {/* <Logo /> */}
          <h1 className='text-foreground dark:text-white font-semibold text-3xl lg:text-4xl mt-2'>Ayo Bergabung</h1>
          <h5 className='text-muted-foreground mt-2 '>Silahkan daftarkan akun anda untuk mengakses layanan perpustakaan Teknik Informatika</h5>

          <form className='mt-6 w-full flex flex-col gap-y-4'>

            <main className='grid grid-cols-2 gap-x-2'>
              <div className="grid items-center gap-1.5">
                <Label htmlFor="email">Nama</Label>
                <Input type="email" id="email" placeholder="johndoe@gmail.com" className='mt-2' />
              </div>

              <div className="grid items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="johndoe@gmail.com" className='mt-2' />
              </div>
            </main>

            <main className='grid grid-cols-2 gap-x-2'>
              <div className="grid items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="johndoe@gmail.com" className='mt-2' />
              </div>

              <div className="grid items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Daftar Sebagai" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pilih salah satu</SelectLabel>
                      <SelectItem value="dosen">Dosen</SelectItem>
                      <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                
              </div>

            </main>

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