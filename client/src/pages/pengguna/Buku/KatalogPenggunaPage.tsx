import { getAllBuku } from '@/actions/BukuActions'
import BookRecomendation from '@/components/pengguna/KatalogBukuPengguna/BookRecomendation'
import KatalogCover from '@/components/pengguna/KatalogBukuPengguna/KatalogCover'
import KatalogSection from '@/components/pengguna/KatalogBukuPengguna/KatalogSection'
import KategorySection from '@/components/pengguna/KatalogBukuPengguna/KategorySection'
import LastAdded from '@/components/pengguna/KatalogBukuPengguna/LastAdded'
import Container from '@/globals/Container'
import BookLoading from '@/components/Loading/BookLoading'
import AwaitHooks from '@/hooks/AwaitHooks'
import { defer, useLoaderData } from 'react-router-dom'
import BookSearch from '@/components/pengguna/KatalogBukuPengguna/BookSearch'
import { getAllKategori } from '@/actions/kategoriAction'
import BookCategoryLoading from '@/components/Loading/BookCategoryLoading'
import LastAddedLoading from '@/components/Loading/LastAddedLoading'
import { getAllSuka } from '@/actions/sukaActions'

export const katalogPageLoader = async({request} : {request: Request}) => {

  const url = new URL(request.url)
  const searchParams = url.searchParams.toString()

  return defer({
    buku: getAllBuku(searchParams),
    kategori: getAllKategori(),
    disukai: getAllSuka()
  })
}

const KatalogPenggunaPage = () => {

  const {buku, kategori, disukai} = useLoaderData() as { buku: Promise<any>, kategori: Promise<any>, disukai: Promise<any>}
  const bukuandLikedBuku = Promise.all([buku, disukai])

  return (
    <Container className='my-20'>
      <KatalogCover />
      <BookRecomendation buku={buku} />
      <AwaitHooks data={buku} loadingComponent={<LastAddedLoading />}>
        {data => <LastAdded buku={data.data} />}
      </AwaitHooks>
      <AwaitHooks data={kategori} loadingComponent={<BookCategoryLoading />}>
        {data => <KategorySection data={data.data} />}
      </AwaitHooks>
      <BookSearch />
      <AwaitHooks data={bukuandLikedBuku} loadingComponent={<BookLoading />}>
        {((data) => <KatalogSection dataBuku={data[0].data} total={data[0].total} page={data[0].page} disukai={data[1]} />)}
      </AwaitHooks>
    </Container>
  )
}

export default KatalogPenggunaPage