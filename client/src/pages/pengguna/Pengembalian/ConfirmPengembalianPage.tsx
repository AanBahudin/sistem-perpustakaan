import { createPengembalianUser } from '@/actions/pengembalianActions'
import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

const ConfirmPengembalian = () => {

  const {id} = useParams()

  const {isLoading} = useQuery({
    queryKey: ['confirm', 'pengembalian', id],
    queryFn: () => createPengembalianUser(id as string)
  })

  if (isLoading) return  <h1>Loading...</h1>

  return (
    <Container>
      <h1>Confirm pengembalian page</h1>
    </Container>
  )
}

export default ConfirmPengembalian