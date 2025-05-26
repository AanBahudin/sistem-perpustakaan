import { getAllBuku } from '@/actions/BukuActions'
import BookRecomendation from '@/components/pengguna/KatalogBukuPengguna/BookRecomendation'
import KatalogCover from '@/components/pengguna/KatalogBukuPengguna/KatalogCover'
import KatalogSection from '@/components/pengguna/KatalogBukuPengguna/KatalogSection'
import KategorySection from '@/components/pengguna/KatalogBukuPengguna/KategorySection'
import LastAdded from '@/components/pengguna/KatalogBukuPengguna/LastAdded'
import PeminjamanLoading from '@/components/pengguna/peminjamanPengguna/PeminjamanLoading'
import Container from '@/globals/Container'
import BookLoading from '@/components/Loading/BookLoading'
import AwaitHooks from '@/hooks/AwaitHooks'
import { defer, useLoaderData } from 'react-router-dom'
import BookSearch from '@/components/pengguna/KatalogBukuPengguna/BookSearch'
import { getAllKategori } from '@/actions/kategoriAction'
import BookCategoryLoading from '@/components/Loading/BookCategoryLoading'

export const katalogPageLoader = async({request} : {request: Request}) => {

  const url = new URL(request.url)
  const searchParams = url.searchParams.toString()

  return defer({
    buku: getAllBuku(searchParams),
    kategori: getAllKategori()
  })
}

const KatalogPenggunaPage = () => {

  const {buku, kategori} = useLoaderData() as { buku: Promise<any>, kategori: Promise<any> }

  return (
    <Container className='my-20'>
      <KatalogCover />
      <BookRecomendation buku={buku} />
      <AwaitHooks data={buku} loadingComponent={<PeminjamanLoading />}>
        {data => <LastAdded buku={data.data} />}
      </AwaitHooks>
      <AwaitHooks data={kategori} loadingComponent={<BookCategoryLoading />}>
        {data => <KategorySection data={data.data} />}
      </AwaitHooks>
      <BookSearch />
      <AwaitHooks data={buku} loadingComponent={<BookLoading />}>
        {((data) => <KatalogSection dataBuku={data.data} total={data.total} page={data.page} />)}
      </AwaitHooks>
    </Container>
  )
}

export default KatalogPenggunaPage