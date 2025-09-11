import PustakawanCard from "./PustakawanCard"
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { prodiGetAllPustakawanData } from '@/actions/Prodi/ProdiPustakawanActions'

const PustakawanDataContainer = () => {

  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const {data, isLoading} = useQuery({
    queryKey: ['semua', 'pustakawan', params],
    queryFn: () => prodiGetAllPustakawanData(params)
  })

  if (isLoading) return <h1>Loading...</h1>

  return (
    <section className='w-full grid grid-cols-4 my-4 gap-4'>
      {data.map((item: any, index: number) => {
        return (
          <PustakawanCard key={index} pustakawan={item} />
        )
      })}
    </section>
  )
}

export default PustakawanDataContainer