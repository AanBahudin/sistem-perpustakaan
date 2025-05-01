import Container from '@/globals/Container'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import heroImg from '@/assets/images/hero.png'

const Hero = () => {
  return (
    <Container className='my-10 bg-none lg:bg-[url("/images/bg.png")] bg-cover bg-cente'>
      <div className="flex items-center justify-between gap-x-6">
        
        <section className='w-fit'>
          <h1 className='text-4xl lg:text-5xl font-semibold leading-12 lg:leading-16'>Selamat Datang Di Perpustakaan <br /> Teknik Informatika</h1>
          <p className='w-full lg:w-[70%] mt-6 text-muted-foreground'>Nikmati akses ke beragam koleksi buku, jurnal, dan sumber digital yang mendukung studi dan penelitian Anda. Dengan fasilitas yang nyaman, perpustakaan ini siap menjadi ruang belajar yang inspiratif.</p>

          <div className='flex gap-x-4 mt-8'>
            <Button asChild>
              <Link to='/login' className='w-36 bg-primary text-center py-2 rounded text-sm border border-transparent text-white'>Mulai Sekarang</Link>
            </Button>
            <Link to='/login' className='w-36 text-center py-2 rounded text-sm text-muted-foreground border border-foreground'>Lihat Detail</Link>
            
          </div>
        </section>

        <section className='w-fit h-full hidden lg:flex justify-end'>
          {/* <div></div> */}
          <img src={heroImg} className='aspect-square rounded-2xl'/>
        </section>
      </div>
    </Container>
  )
}

export default Hero