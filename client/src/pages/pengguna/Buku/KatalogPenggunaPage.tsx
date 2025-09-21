import { getAllBuku } from '@/actions/BukuActions'
import BookRecomendation from '@/components/pengguna/Katalog Buku Pengguna/BookRecomendation'
import KatalogCover from '@/components/pengguna/Katalog Buku Pengguna/KatalogCover'
import KatalogSection from '@/components/pengguna/Katalog Buku Pengguna/KatalogSection'
import KategorySection from '@/components/pengguna/Katalog Buku Pengguna/KategorySection'
import LastAdded from '@/components/pengguna/Katalog Buku Pengguna/LastAdded'
import Container from '@/globals/Container'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import BookLoading from '@/components/Loading/BookLoading'

const KatalogPenggunaPage = () => {

  const [searchParams] = useSearchParams()
  const fullParams = new URLSearchParams(searchParams).toString()
  
  const {data: dataBuku, isLoading} = useQuery({
    queryKey: ['buku'],
    queryFn: () => getAllBuku(fullParams)
  })

  if (isLoading) return <BookLoading />

  return (
    <Container className='my-20'>
      <KatalogCover />
      <BookRecomendation buku={dataBuku.data} />
      <LastAdded buku={dataBuku.data} />
      <KategorySection />
      <KatalogSection dataBuku={dataBuku.data} total={dataBuku.total}/>
    </Container>
  )
}

export default KatalogPenggunaPage