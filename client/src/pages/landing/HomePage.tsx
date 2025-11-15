import About from '@/components/landing/About'
import CallToAction from '@/components/landing/CallToAction'
import Faq from '@/components/landing/Faq'
import Footer from '@/components/landing/Footer'
import Gallery from '@/components/landing/Gallery'
import Hero from '@/components/landing/Hero'
import Katalog from '@/components/landing/Katalog'
import Kontak from '@/components/landing/Kontak'
// import Layanan from '@/components/landing/Layanan'
import Parallax from '@/components/landing/Parallax'
// import Statistik from '@/components/landing/Statistik'
import Testimoni from '@/components/landing/Testimoni'
import Container from '@/globals/Container'
import React from 'react'

const HomePage : React.FC = () => {
  return (
    <Container className='w-full'>
      <Hero />
      
      <About />
      {/* <Statistik /> */}
      <Gallery />
      {/* <Layanan /> */}
      <Testimoni />
      <Katalog />
      <Parallax />
      <Faq />
      <CallToAction />
      <Kontak />
      <Footer />
    </Container>
  )
}

export default HomePage 