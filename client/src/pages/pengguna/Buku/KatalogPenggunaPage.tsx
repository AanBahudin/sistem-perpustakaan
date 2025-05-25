import { getAllBuku } from '@/actions/BukuActions'
import BookRecomendation from '@/components/pengguna/KatalogBukuPengguna/BookRecomendation'
import KatalogCover from '@/components/pengguna/KatalogBukuPengguna/KatalogCover'
import KatalogSection from '@/components/pengguna/KatalogBukuPengguna/KatalogSection'
import KategorySection from '@/components/pengguna/KatalogBukuPengguna/KategorySection'
import LastAdded from '@/components/pengguna/KatalogBukuPengguna/LastAdded'
import PeminjamanLoading from '@/components/pengguna/peminjamanPengguna/PeminjamanLoading'
import Container from '@/globals/Container'
import AwaitHooks from '@/hooks/AwaitHooks'
import { defer, useLoaderData } from 'react-router-dom'

export const katalogPageLoader = async({request} : {request: Request}) => {

  const url = new URL(request.url)
  const searchParams = url.searchParams.toString()

  return defer({
    buku: getAllBuku(searchParams)
  })
}

const KatalogPenggunaPage = () => {

  const {buku} = useLoaderData() as { buku: Promise<any> }

  return (
    <Container className='my-20'>
      <KatalogCover />
      <BookRecomendation buku={buku} />
      <AwaitHooks data={buku} loadingComponent={<PeminjamanLoading />}>
        {data => <LastAdded buku={data.data} />}
      </AwaitHooks>
      <KategorySection />
      
      <AwaitHooks data={buku} loadingComponent={<PeminjamanLoading />}>
        {((data) => <KatalogSection dataBuku={data.data} total={data.total} page={data.page} />)}
      </AwaitHooks>
    </Container>
  )
}

export default KatalogPenggunaPage