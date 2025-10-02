import Container from '@/globals/Container'
import { Outlet } from 'react-router-dom'

const DiscoveryPage = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  )
}

export default DiscoveryPage