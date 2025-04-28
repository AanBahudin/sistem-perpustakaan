import Container from '@/globals/Container'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

const Hero = () => {
  return (
    <Container className='py-20'>
      <div className="flex items-center justify-between gap-x-6 ">
        <section>
          <h1 className='text-4xl lg:text-5xl font-bold'>Selamat Datang Di Perpustakaan <br /> Teknik Informatika</h1>
          <p className='w-full lg:w-[70%] mt-6 text-muted-foreground'>Nikmati akses ke beragam koleksi buku, jurnal, dan sumber digital yang mendukung studi dan penelitian Anda. Dengan fasilitas yang nyaman, perpustakaan ini siap menjadi ruang belajar yang inspiratif.</p>

          <div className='flex gap-x-4 mt-8'>
            <Button asChild>
              <Link to='/login' className='w-36 bg-primary text-center py-2 rounded text-sm border border-transparent'>Mulai Sekarang</Link>
            </Button>
            <Link to='/login' className='w-36 text-center py-2 rounded text-sm text-muted-foreground border border-foreground'>Lihat Detail</Link>
            
          </div>
        </section>

        <section className='hidden lg:block'>
          <div className='w-[400px] h-[400px] bg-muted rounded-2xl'></div>
        </section>
      </div>
    </Container>
  )
}

export default Hero