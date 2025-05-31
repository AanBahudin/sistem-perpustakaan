import Container from '@/globals/Container'
import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

const PeminjamanDetailPage = () => {

  const {id} = useParams()

  const results = useQueries({
    queries: []
  }) 

  return (
    <Container className='my-20'>
      <h1>Peminjaman</h1>
    </Container>
  )
}

export default PeminjamanDetailPage