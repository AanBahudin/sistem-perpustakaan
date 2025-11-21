import BookRecomendation from '@/components/pengguna/Katalog Buku Pengguna/BookRecomendation'
import KatalogCover from '@/components/pengguna/Katalog Buku Pengguna/KatalogCover'
import KatalogSection from '@/components/pengguna/Katalog Buku Pengguna/KatalogSection'
import KategorySection from '@/components/pengguna/Katalog Buku Pengguna/KategorySection'
import LastAdded from '@/components/pengguna/Katalog Buku Pengguna/LastAdded'
import Container from '@/globals/Container'
import BookLoading from '@/components/Loading/BookLoading'
import useFetchBukuKatalogPengguna from '@/hooks/fetchHooks/penggunaHooks/bukuHooks/useFetchBukuKatalogPengguna'

const KatalogPenggunaPage = () => {
  
  const {isLoading, rekomendasiBuku, bukuTerbaru, buku} = useFetchBukuKatalogPengguna()
  if (isLoading) return <BookLoading />

  return (
    <Container className='my-20'>
      <KatalogCover />
      <BookRecomendation buku={rekomendasiBuku} />
      <LastAdded buku={bukuTerbaru[0]} />
      <KategorySection />
      <KatalogSection dataBuku={buku} total={buku.length || 0}/>
    </Container>
  )
}

export default KatalogPenggunaPage