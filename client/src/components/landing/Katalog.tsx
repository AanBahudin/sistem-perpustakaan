import Container from '@/globals/Container'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

const Katalog = () => {
  return (
    <Container className='flex flex-col'>
        <h1 id='katalog' className='text-3xl font-semibold mb-8 text-center'>Katalog Bacaan</h1>
        <h5 className='text-center text-muted-foreground w-full lg:w-[60%] mx-auto'>
        Nikmati akses ke beragam koleksi buku, jurnal, dan sumber digital yang mendukung studi dan penelitian Anda. Dengan fasilitas yang nyaman, perpustakaan ini siap menjadi ruang belajar yang inspiratif. Nikmati akses ke beragam koleksi buku, jurnal
        </h5>

        {/* ICON */}
        <ScrollArea>
            <section className='flex items-center gap-x-6 mt-10 justify-center'>
                <div className='w-50 h-70 bg-muted-foreground rounded'></div>
                <div className='w-50 h-70 bg-muted-foreground rounded'></div>
                <div className='w-50 h-70 bg-muted-foreground rounded'></div>
                <div className='w-50 h-70 bg-muted-foreground rounded'></div>
                <div className='w-50 h-70 bg-muted-foreground rounded'></div>
                <div className='w-50 h-70 bg-muted-foreground rounded'></div>
                <div className='w-50 h-70 bg-muted-foreground rounded'></div>
                <div className='w-50 h-70 bg-muted-foreground rounded'></div>
                <div className='w-50 h-70 bg-muted-foreground rounded'></div>
                <div className='w-50 h-70 bg-muted-foreground rounded'></div>
                <div className='w-50 h-70 bg-m  uted-foreground rounded'></div>
            </section>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <Button className='w-fit mx-auto mt-6 px-10 font-normal text-white'>
          <Link to='/katalog' className=''>Lihat lainnya</Link>
        </Button>
    </Container>
  )
}

export default Katalog