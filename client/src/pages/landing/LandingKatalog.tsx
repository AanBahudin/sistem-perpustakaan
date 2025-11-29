import DataPagination from '@/components/pengguna/peminjamanPengguna/DataPagination'
import Container from '@/globals/Container'
import useFetchKatalogData from '@/hooks/fetchHooks/landingHooks/useFetchKatalogData'
import LandingKatalogSearchInput from '@/components/landing/Katalog/LandingKatalogSearchInput'
import LandingKatalogBookList from '@/components/landing/Katalog/LandingKatalogBookList'
import LandingKatalogLoading from '@/components/landing/Katalog/LandingKatalogLoading'

const LandingKatalog = () => {

  const { data, isLoading } = useFetchKatalogData()
  
  return (
    <Container className='py-20'>
      <h1 className="text-3xl font-bold mt-10">Telusuri Semua Buku</h1>
      <p className="text-muted-foreground mt-2 mb-10 text-sm w-2/3">Temukan seluruh koleksi buku kami secara lengkap dan terstruktur. Halaman ini menampilkan setiap judul beserta penulisnya, memudahkan navigasi dan pencarian tanpa gangguan</p>

      <LandingKatalogSearchInput />

      {isLoading ? (
        <LandingKatalogLoading />
      ) : (
        <>
          <section className='w-full min-h-[40vh] my-10'>
            <LandingKatalogBookList dataBuku={data.dataBuku} />
          </section>

          <DataPagination totalPage={data.totalPage} />
        </>
      )}
    </Container>
  )
}

export default LandingKatalog