import Container from '@/globals/Container'
import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const CallToAction : React.FC = () => {
  return (
    <Container className='p-14 lg:p-20 flex-col shadow-2xl flex items-center justify-center bg-primary rounded-2xl'>
      <h1 className='text-white font-semibold text-2xl lg:text-3xl text-center'>Rancang Studi Lebih Terarah <br /> dengan Akses Buku Informatika Terlengkap.</h1>
      <Button asChild variant='secondary' className='mt-8'>
        <Link to='/login'>Daftar Sekarang</Link>
      </Button>
    </Container>
  )
}

export default CallToAction