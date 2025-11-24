import { getAllPenggunaMahasiswa } from '@/actions/Pustakawan/Pengguna/PustakawanGetPenggunaActions'
import GrafikPertumbuhanSemuaPengguna from '@/components/Pustakawan/Pengguna/SemuaPengguna/GrafikPertumbuhanSemuaPengguna'
import SemuaPenggunaFilter from '@/components/Pustakawan/Pengguna/SemuaPengguna/SemuaPenggunaFilter'
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import TableSemuaPengguna from '../../../components/Pustakawan/Pengguna/SemuaPengguna/TableSemuaPengguna'
import PenggunaPageLoading from '@/components/Pustakawan/Pengguna/PenggunaPageLoading'

const DaftarPenggunaMahasiswa = () => {
  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const {data, isLoading} = useQuery({
    queryKey: ['mahasiswa', 'pengguna', params],
    queryFn: () => getAllPenggunaMahasiswa(params)
  })

  if (isLoading) return <PenggunaPageLoading />

  return (
    <Container className='w-full'>
      <PustakawanBreadCrumbs />
      <GrafikPertumbuhanSemuaPengguna graphFor='mahasiswa' title='Statistik Pertumbuhan Dosen Bulanan' monthlyUserGrowData={data.monthlyUserGrowth} userAccountStatusRatio={data.userAccountStatusRatio}/>
      <SemuaPenggunaFilter usedIn='mahasiswa' />
      <TableSemuaPengguna dataPengguna={data.pengguna} />
    </Container>
  )
}

export default DaftarPenggunaMahasiswa