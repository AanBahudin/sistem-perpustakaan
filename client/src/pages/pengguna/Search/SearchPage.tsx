import { getAllKategori } from '@/actions/kategoriAction'
import { searchBookPageDataLoader } from '@/actions/searchActions'
import SearchBooks from '@/components/pengguna/SearchPage/SearchBooks'
import SearchFilter from '@/components/pengguna/SearchPage/SearchFilter'
import { useQueries } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const SearchPage = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const params = searchParams.get('q')

  const result = useQueries({
    queries: [
      {
        queryKey: ['search', params],
        queryFn: () => searchBookPageDataLoader(params as string)
      },
      {
        queryKey: ['search', 'kategori', params],
        queryFn: getAllKategori
      }
    ]
  })


  const [searchData, allKategori] = result
  const isLoading = result.some(q => q.isLoading)

  useEffect(() => {
    if (!params) {
      navigate('/my/buku')
    }
  }, [])

  if (isLoading) return <h1>Loadingg</h1>

  return (
    <section className='w-[90%] mx-auto my-20 flex gap-x-4'>
      <main className='w-[20%]'>
        <SearchFilter kategori={allKategori.data} />
      </main>

      <main className='w-[80%]'>
        <h1 className='text-xl mb-6 text-muted-foreground font-semibold'>Menampilkan hasil untuk <span className='italic text-primary underline'>{params}</span></h1>
        <SearchBooks data={searchData.data} />
      </main>

    </section>
  )
}

export default SearchPage