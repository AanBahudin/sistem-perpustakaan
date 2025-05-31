import { getPerpanjangan } from '@/actions/perpanjanganActions'
import PeminjamanLoading from '@/components/pengguna/peminjamanPengguna/PeminjamanLoading'
import PerpanjanganDataLayout from '@/components/pengguna/PerpanjanganPengguna.tsx/PerpanjanganDataLayout'
import PerpanjanganSearch from '@/components/pengguna/PerpanjanganPengguna.tsx/PerpanjanganSearch'
import PerpanjanganTab from '@/components/pengguna/PerpanjanganPengguna.tsx/PerpanjanganTab'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

const PerpanjanganPage = () => {
  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()
  
  const {data: dataPerpanjangan, isLoading} = useQuery({
    queryKey: ['perpanjangan', params],
    queryFn: () => getPerpanjangan(params)
  })

  return (
    <main className='col-span-9'>
      <PerpanjanganTab />
      <PerpanjanganSearch />

      {isLoading ? <PeminjamanLoading /> : <PerpanjanganDataLayout data={dataPerpanjangan.data}/>}
      
    </main>
  )
}

export default PerpanjanganPage