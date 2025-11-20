import SearchBooks from '@/components/pengguna/SearchPage/SearchBooks'
import SearchFilter from '@/components/pengguna/SearchPage/SearchFilter'
import SearchLoading from '@/components/pengguna/SearchPage/SearchLoading'
import usePenggunaSearchBuku from '@/hooks/fetchHooks/penggunaHooks/searchHooks/usePenggunaSearchBuku'


const SearchPage = () => {

  const { isLoading, allKategori, dataPenerbit, dataPenulis, searchData } = usePenggunaSearchBuku()
  if (isLoading) return <SearchLoading />

  return (
    <section className='w-full mx-auto my-20 flex gap-x-4'>
      <main className='w-[25%]'>
        <SearchFilter 
          kategori={allKategori.data}
          penerbit={dataPenerbit.data}
          penulis={dataPenulis.data} />
      </main>

      <main className='w-[75%]'>
        <SearchBooks data={searchData.data} />
      </main>

    </section>
  )
}

export default SearchPage