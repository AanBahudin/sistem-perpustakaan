import { getAllBuku } from '@/actions/BukuActions'
import BookRecomendation from '@/components/pengguna/Katalog Buku Pengguna/BookRecomendation'
import KatalogCover from '@/components/pengguna/Katalog Buku Pengguna/KatalogCover'
import KatalogSection from '@/components/pengguna/Katalog Buku Pengguna/KatalogSection'
import KategorySection from '@/components/pengguna/Katalog Buku Pengguna/KategorySection'
import LastAdded from '@/components/pengguna/Katalog Buku Pengguna/LastAdded'
import Container from '@/globals/Container'
import BookLoading from '@/components/Loading/BookLoading'
import AwaitHooks from '@/hooks/AwaitHooks'
import { defer, useLoaderData } from 'react-router-dom'
import { getAllKategori } from '@/actions/kategoriAction'
import BookCategoryLoading from '@/components/Loading/BookCategoryLoading'
import LastAddedLoading from '@/components/Loading/LastAddedLoading'
import { getAllSuka } from '@/actions/sukaActions'
import { getAllSimpanan } from '@/actions/simpanActions'

export const katalogPageLoader = async({request} : {request: Request}) => {

  const url = new URL(request.url)
  const searchParams = url.searchParams.toString()

  return defer({
    buku: getAllBuku(searchParams),
    kategori: getAllKategori(),
    disukai: getAllSuka(),
    tersimpan: getAllSimpanan()
  })
}

const KatalogPenggunaPage = () => {

  const {buku, kategori, disukai, tersimpan} = useLoaderData() as { buku: Promise<any>, kategori: Promise<any>, disukai: Promise<any>, tersimpan: Promise<any>}
  const bukuandLikedBuku = Promise.all([buku, disukai, tersimpan])

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
      <AwaitHooks data={bukuandLikedBuku} loadingComponent={<BookLoading />}>
        {((data) => <KatalogSection dataBuku={data[0].data} total={data[0].total}/>)}
      </AwaitHooks>
    </Container>
  )
}

export default KatalogPenggunaPage