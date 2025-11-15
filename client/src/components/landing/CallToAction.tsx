import Container from '@/globals/Container'
import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const CallToAction : React.FC = () => {
  return (
    <Container className='p-14 bg-[url("/images/callToAction.png")] object-contain bg-center lg:p-20 flex-col shadow-2xl flex items-center justify-center rounded-2xl'>
      <h1 className='text-accent-foreground font-semibold text-2xl lg:text-3xl text-center'>Rancang Studi Lebih Terarah <br /> dengan Akses Buku Informatika Terlengkap.</h1>
      <p className='text-center w-[80%] mx-auto mt-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum distinctio necessitatibus blanditiis esse beatae eligendi pariatur magni et asperiores, dolorem maxime, nostrum dignissimos est! Asperiores illo distinctio expedita quisquam quasi.</p>
      <Button asChild variant='default' className='mt-8 text-white'>
        <Link to='/login'>Daftar Sekarang</Link>
      </Button>
    </Container>
  )
}

export default CallToAction