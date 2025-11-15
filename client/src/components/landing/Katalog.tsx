import Container from '@/globals/Container'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import useFetchLandingData from '@/hooks/fetchHooks/landingHooks/useFetchLandingData'
import LandingKatalogLoading from './Katalog/LandingKatalogLoading'
import KatalogThumbnailImage from './Katalog/KatalogThumbnailImage'

const Katalog = () => {
  const { data, isLoading } = useFetchLandingData()

  return (
    <Container className='w-full p-10 flex flex-col bg-[url("/images/callToAction.png")] object-contain bg-center'>
      <h1 id='katalog' className='text-3xl font-semibold mb-8 text-center'>Katalog Bacaan</h1>
      <h5 className='text-center text-muted-foreground w-full lg:w-[60%] mx-auto'>
      Nikmati akses ke beragam koleksi buku, jurnal, dan sumber digital yang mendukung studi dan penelitian Anda. Dengan fasilitas yang nyaman, perpustakaan ini siap menjadi ruang belajar yang inspiratif. Nikmati akses ke beragam koleksi buku, jurnal
      </h5>

      {/* ICON */}
      <ScrollArea>
          {isLoading ? <LandingKatalogLoading /> : <KatalogThumbnailImage data={data.katalogReview} />}
          <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Button className='w-fit mx-auto mt-6 px-10 font-normal text-white'>
        <Link to='/katalog' className=''>Lihat lainnya</Link>
      </Button>
    </Container>
  )
}



export default Katalog