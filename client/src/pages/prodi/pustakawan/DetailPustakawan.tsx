import { prodiGetSinglePustakawanData } from '@/actions/Prodi/ProdiPustakawanActions'
import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

const DetailPustakawan = () => {

  const {id} = useParams()

  const {data, isLoading} = useQuery({
    queryKey: ['detail', 'pustakawan', id],
    queryFn: () => prodiGetSinglePustakawanData(id as string)
  })

  if (isLoading) return <h1>Loading...</h1>

  return (
    <Container className='w-full'>
      <h1>Detail pengguna</h1>
    </Container>
  )
}

export default DetailPustakawan