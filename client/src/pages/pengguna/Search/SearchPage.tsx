import { searchBookPageDataLoader } from '@/actions/searchActions'
import SearchBooks from '@/components/pengguna/SearchPage/SearchBooks'
import SearchFilter from '@/components/pengguna/SearchPage/SearchFilter'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const SearchPage = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const params = searchParams.get('q')

  const {data, isLoading} = useQuery({
    queryKey: ['search', params],
    queryFn: () => searchBookPageDataLoader(params as string)
  })

  useEffect(() => {
    if (!params) {
      navigate('/my/buku')
    }
  }, [])

  if (isLoading) return <h1>Loadingg</h1>

  return (
    <section className='w-[90%] mx-auto my-20 flex gap-x-4'>
      <main className='w-[20%]'>
        <SearchFilter />
      </main>

      <main className='w-[80%]'>
        <h1 className='text-xl mb-6 text-muted-foreground font-semibold'>Menampilkan hasil untuk <span className='italic text-primary underline'>{params}</span></h1>
        <SearchBooks data={data} />
      </main>

    </section>
  )
}

export default SearchPage