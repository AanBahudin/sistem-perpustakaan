import { prodiGetAllPustakawanData } from '@/actions/Prodi/ProdiPustakawanActions'
import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

const SemuaPustakawan = () => {

  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const {data, isLoading} = useQuery({
    queryKey: ['semua', 'pustakawan', params],
    queryFn: () => prodiGetAllPustakawanData(params)
  })

  if (isLoading) return <h1>Loading...</h1>
  console.log(data)

  return (
    <Container className='w-full'>
      <h1>SemuaPustakawan</h1>
    </Container>

  )
}

export default SemuaPustakawan