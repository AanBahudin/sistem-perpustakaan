import BookRecomendation from '@/components/pengguna/KatalogBukuPengguna/BookRecomendation'
import KatalogCover from '@/components/pengguna/KatalogBukuPengguna/KatalogCover'
import KatalogSection from '@/components/pengguna/KatalogBukuPengguna/KatalogSection'
import KategorySection from '@/components/pengguna/KatalogBukuPengguna/KategorySection'
import LastAdded from '@/components/pengguna/KatalogBukuPengguna/LastAdded'
import Container from '@/globals/Container'

const KatalogPenggunaPage = () => {
  return (
    <Container className='my-20'>
      <KatalogCover />
      <BookRecomendation />
      <LastAdded />
      <KategorySection />
      <KatalogSection />
    </Container>
  )
}

export default KatalogPenggunaPage