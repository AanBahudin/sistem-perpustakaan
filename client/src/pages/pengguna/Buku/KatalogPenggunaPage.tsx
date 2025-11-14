import { getDashboardBookAction } from '@/actions/BukuActions'
import BookRecomendation from '@/components/pengguna/Katalog Buku Pengguna/BookRecomendation'
import KatalogCover from '@/components/pengguna/Katalog Buku Pengguna/KatalogCover'
import KatalogSection from '@/components/pengguna/Katalog Buku Pengguna/KatalogSection'
import KategorySection from '@/components/pengguna/Katalog Buku Pengguna/KategorySection'
import LastAdded from '@/components/pengguna/Katalog Buku Pengguna/LastAdded'
import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'
import BookLoading from '@/components/Loading/BookLoading'

const KatalogPenggunaPage = () => {
  
  const {data: dataBuku, isLoading} = useQuery({
    queryKey: ['dashbaord', 'buku'],
    queryFn: () => getDashboardBookAction()
  })

  if (isLoading) return <BookLoading />

  const { rekomendasiBuku, bukuTerbaru, buku } = dataBuku

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