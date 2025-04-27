import Container from '@/globals/Container'

const Layanan = () => {
  return (
    <Container className='py-10 my-10'>
        <h1 id='layanan' className='text-3xl font-semibold mb-8 text-center'>Layanan Perpustakaan</h1>
        <h5 className='text-center text-muted-foreground w-full lg:w-[60%] mx-auto'>
        Nikmati akses ke beragam koleksi buku, jurnal, dan sumber digital yang mendukung studi dan penelitian Anda. Dengan fasilitas yang nyaman, perpustakaan ini siap menjadi ruang belajar yang inspiratif. Nikmati akses ke beragam koleksi buku, jurnal
        </h5>

        {/* ICON */}
        <section className='flex items-center gap-x-6 gap-y-6 lg:gap-y-0 mt-10 justify-center flex-wrap'>
            <div className='w-50 h-30 bg-muted-foreground rounded'></div>
            <div className='w-50 h-30 bg-muted-foreground rounded'></div>
            <div className='w-50 h-30 bg-muted-foreground rounded'></div>
            <div className='w-50 h-30 bg-muted-foreground rounded'></div>
        </section>
    </Container>
  )
}

export default Layanan