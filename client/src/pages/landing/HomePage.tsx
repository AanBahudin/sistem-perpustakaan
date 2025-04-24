import About from '@/components/landing/About'
import Hero from '@/components/landing/Hero'
import Katalog from '@/components/landing/Katalog'
import Kontak from '@/components/landing/Kontak'
import Layanan from '@/components/landing/Layanan'
import React from 'react'

const HomePage : React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Layanan />
      <Katalog />
      <Kontak />
    </>
  )
}

export default HomePage