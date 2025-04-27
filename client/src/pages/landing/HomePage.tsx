import About from '@/components/landing/About'
import Faq from '@/components/landing/Faq'
import Hero from '@/components/landing/Hero'
import Katalog from '@/components/landing/Katalog'
import Kontak from '@/components/landing/Kontak'
import Layanan from '@/components/landing/Layanan'
import Statistik from '@/components/landing/Statistik'
import Testimoni from '@/components/landing/Testimoni'
import React from 'react'

const HomePage : React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Statistik />
      <Layanan />
      <Testimoni />
      <Katalog />
      <Faq />
      <Kontak />
    </>
  )
}

export default HomePage