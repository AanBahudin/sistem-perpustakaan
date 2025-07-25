import { getAllKategori } from '@/actions/kategoriAction'
import { getAllPenerbit } from '@/actions/penerbitActions'
import { searchBookPageDataLoader } from '@/actions/searchActions'
import SearchBooks from '@/components/pengguna/SearchPage/SearchBooks'
import SearchFilter from '@/components/pengguna/SearchPage/SearchFilter'
import SearchLoading from '@/components/pengguna/SearchPage/SearchLoading'
import { useQueries } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const SearchPage = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const result = useQueries({
    queries: [
      {
        queryKey: ['search', params],
        queryFn: () => searchBookPageDataLoader(params as string),
      },
      {
        queryKey: ['search', 'kategori', params],
        queryFn: getAllKategori
      },
      {
        queryKey: ['penerbit'],
        queryFn: getAllPenerbit
      }
    ]
  })


  const [searchData, allKategori, dataPenerbit] = result
  const isLoading = result.some(q => q.isLoading)

  useEffect(() => {
    if (!params) {
      navigate('/my/buku')
    }
  }, [])

  if (isLoading) return <SearchLoading />

  return (
    <section className='w-full mx-auto my-20 flex gap-x-4'>
      <main className='w-[25%]'>
        <SearchFilter 
          kategori={allKategori.data}
          penerbit={dataPenerbit.data}
          penulis={[]} />
      </main>

      <main className='w-[75%]'>
        <SearchBooks data={searchData.data} />
      </main>

    </section>
  )
}

export default SearchPage