import React from 'react'
import Container from '@/globals/Container'


const About = () => {
  return (
    <Container>
        <h1 id='tentang' className='text-3xl font-semibold mb-8'>Sekilas Perpustakaan</h1>

        <section className='grid grid-cols-1 lg:grid-cols-2 place-items-center'>
            <div>
                <h5 className='text-muted-foreground'>
                Nikmati akses ke beragam koleksi buku, jurnal, dan sumber digital yang mendukung studi dan penelitian Anda. Dengan fasilitas yang nyaman, perpustakaan ini siap menjadi ruang belajar yang inspiratif. Nikmati akses ke beragam koleksi buku, jurnal, dan sumber digital yang mendukung studi dan penelitian Anda. Dengan fasilitas yang nyaman, perpustakaan ini siap menjadi ruang belajar yang inspiratif.
                </h5>

                <h5 className='mt-6 text-muted-foreground'>
                Nikmati akses ke beragam koleksi buku, jurnal, dan sumber digital yang mendukung studi dan penelitian Anda. Dengan fasilitas yang nyaman, perpustakaan ini siap menjadi ruang belajar yang inspiratif. Nikmati akses beragam koleksi buku, jurnal, dan sumber digital yang mendukung studi dan penelitian Anda. Dengan fasilitas yang nyaman, perpustakaan ini siap menjadi ruang belajar yang inspiratif. Nikmati akses
                </h5>
            </div>

            <div className='justify-self-end lg:grid hidden'>
                <div className='w-[500px] h-[300px] bg-muted-foreground rounded'></div>
            </div>
        </section>
    </Container>
  )
}

export default About