import Container from '@/globals/Container'
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import { useQuery } from '@tanstack/react-query'
import { getAllPengajuanPeminjaman } from '@/actions/Pustakawan/pustakawanPengajuanActions'

const PustakawanPeminjaman = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['semua', 'peminjaman'],
    queryFn: getAllPengajuanPeminjaman
  })


  if (isLoading) return <h1>Loading ... </h1>
  console.log(data)

  return (
    <Container className='w-full'>
      <PustakawanBreadCrumbs />
    </Container>
  )
}

export default PustakawanPeminjaman