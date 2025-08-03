import GrafikPertumbuhanSemuaPengguna from '@/components/Pustakawan/Pengguna/SemuaPengguna/GrafikPertumbuhanSemuaPengguna'
import SemuaPenggunaFilter from '@/components/Pustakawan/Pengguna/SemuaPengguna/SemuaPenggunaFilter'
import Container from '@/globals/Container'
import TableSemuaPengguna from './TableSemuaPengguna'
import { useQuery } from '@tanstack/react-query'
import { getAllPengguna } from '@/actions/Pustakawan/PustakawanGetPenggunaActions'

const DaftarSemuaPengguna = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['semua', 'pengguna'],
    queryFn: getAllPengguna
  })

  if (isLoading) return <h1>Loading...</h1>
  console.log(data)

  return (
    <Container className='w-full'>
      <GrafikPertumbuhanSemuaPengguna />
      <SemuaPenggunaFilter />
      <TableSemuaPengguna dataPengguna={data} />
    </Container>
  )
}

export default DaftarSemuaPengguna