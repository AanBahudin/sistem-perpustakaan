import Container from '@/globals/Container'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Bell, Computer, Info, Lock, Users } from 'lucide-react'

const Hero = () => {

  const imageURL : string = 'https://res.cloudinary.com/dhthnjizr/image/upload/v1745905005/k861oq846rph9u5b1oh3.jpg'

  return (
    <Container className='w-full mb-30 relative min-h-[90vh] lg:bg-[url("/images/heroimg.png")] bg-cover bg-center flex items-center justify-center flex-col'>
      <div className="w-[90%] mt-20 flex items-center justify-center mx-auto">
        <section>
          <h1 className='text-4xl lg:text-5xl font-bold text-primary leading-12'>E-Perpus Teknik Informatika <br /> Unidayan Baubau</h1>
          <p className='w-full lg:w-[70%] mt-6 text-muted-foreground'>Nikmati akses ke beragam koleksi buku, jurnal, dan sumber digital yang mendukung studi dan penelitian Anda. Dengan fasilitas yang nyaman, perpustakaan ini siap menjadi ruang belajar yang inspiratif.</p>

          <div className='flex gap-x-4 mt-8'>
            <Button asChild>
              <Link to='/login' className='w-36 bg-primary text-center py-2 rounded text-sm border border-transparent text-white'>Mulai Sekarang</Link>
            </Button>
            <Link to='/login' className='w-36 text-center py-2 rounded text-sm text-muted-foreground border border-foreground'>Lihat Detail</Link>
            
          </div>
        </section>

        <section className='w-fit h-full hidden lg:flex justify-end'>
          <img src={imageURL} className='w-[900px] h-[350px] aspect-square rounded-2xl'/>
        </section>
      </div>

      <Container className='w-[70%] rounded-lg min-h-[20vh] h-fit bg-white dark:bg-black dark:border dark:border-white/50 shadow-2xl top-[80vh] absolute flex items-center justify-evenly'>
        <div className='p-3 rounded-xl bg-primary/20'>
          <Lock className='w-10 stroke-primary h-10' />
        </div>

        <div className='p-3 rounded-xl bg-primary/20'>
          <Info className='w-10 stroke-primary h-10' />
        </div>

        <div className='p-3 rounded-xl bg-primary/20'>
          <Users className='w-10 stroke-primary h-10' />
        </div>

        <div className='p-3 rounded-xl bg-primary/20'>
          <Bell className='w-10 stroke-primary h-10' />
        </div>

        <div className='p-3 rounded-xl bg-primary/20'>
          <Computer className='w-10 stroke-primary h-10' />
        </div>
      </Container>
      
    </Container>
  )
}

export default Hero