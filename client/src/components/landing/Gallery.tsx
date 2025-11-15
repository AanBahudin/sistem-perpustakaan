import React from 'react'
import Container from '@/globals/Container'
import PhotoCarousel from './Gallery/PhotoCarousel'

const Gallery : React.FC = () => {
  return (
    <Container className='flex items-center flex-col justify-center mt-20'>
      <h1 className='font-bold text-primary text-3xl mb-8'>Galeri Perpustakaan</h1>
      <h5 className='text-muted-foreground text-center w-[90%] lg:w-[60%] mx-auto'>Lihat lebih dekat suasana dan fasilitas perpustakaan kami melalui galeri ini. Dari ruang baca yang nyaman hingga koleksi buku yang lengkap, setiap sudut dirancang untuk mendukung kenyamanan belajar dan eksplorasi pengetahuan.</h5>

      <section className='mt-10'>
        <PhotoCarousel />
      </section>
    </Container>
  )
}

export default Gallery