import PustakawanCard from "./PustakawanCard"
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { prodiGetAllPustakawanData } from '@/actions/Prodi/ProdiPustakawanActions'
import PustakawanLoading from "./PustakawanLoading"

const PustakawanDataContainer = () => {

  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const {data, isLoading} = useQuery({
    queryKey: ['semua', 'pustakawan', params],
    queryFn: () => prodiGetAllPustakawanData(params)
  })

  if (isLoading) return <PustakawanLoading />
  if (data.length === 0 && searchParams) {
    return (
      <section className="w-full min-h-[20vh] flex items-center justify-center">
        <p className="text-muted-foreground text-xs">Pustakawan tidak ditemukan</p>
      </section>
    )
  }

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