import GrafikPertumbuhanSemuaPengguna from '@/components/Pustakawan/Pengguna/SemuaPengguna/GrafikPertumbuhanSemuaPengguna'
import SemuaPenggunaFilter from '@/components/Pustakawan/Pengguna/SemuaPengguna/SemuaPenggunaFilter'
import Container from '@/globals/Container'
import TableSemuaPengguna from './TableSemuaPengguna'
import { useQuery } from '@tanstack/react-query'
import { getAllPengguna } from '@/actions/Pustakawan/PustakawanGetPenggunaActions'
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'

const DaftarSemuaPengguna = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['semua', 'pengguna'],
    queryFn: getAllPengguna
  })

  if (isLoading) return <h1>Loading...</h1>

  return (
    <Container className='w-full'>
      <PustakawanBreadCrumbs />
      <GrafikPertumbuhanSemuaPengguna />
      <SemuaPenggunaFilter />
      <TableSemuaPengguna dataPengguna={data} />
    </Container>
  )
}

export default DaftarSemuaPengguna