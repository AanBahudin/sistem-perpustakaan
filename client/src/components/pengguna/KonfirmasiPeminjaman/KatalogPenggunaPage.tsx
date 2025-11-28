import BookRecomendation from '@/components/pengguna/KatalogBukuPengguna/BookRecomendation'
import KatalogCover from '@/components/pengguna/KatalogBukuPengguna/KatalogCover'
import KatalogSection from '@/components/pengguna/KatalogBukuPengguna/KatalogSection'
import KategorySection from '@/components/pengguna/KatalogBukuPengguna/KategorySection'
import LastAdded from '@/components/pengguna/KatalogBukuPengguna/LastAdded'
import Container from '@/globals/Container'
import BookLoading from '@/components/Loading/BookLoading'
import {useFetchBukuKatalogPengguna} from '@/hooks/fetchHooks/penggunaHooks/bukuHooks'

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