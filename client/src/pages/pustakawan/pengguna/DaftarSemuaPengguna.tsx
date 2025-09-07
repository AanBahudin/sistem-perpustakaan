import GrafikPertumbuhanSemuaPengguna from '@/components/Pustakawan/Pengguna/SemuaPengguna/GrafikPertumbuhanSemuaPengguna'
import SemuaPenggunaFilter from '@/components/Pustakawan/Pengguna/SemuaPengguna/SemuaPenggunaFilter'
import Container from '@/globals/Container'
import TableSemuaPengguna from '@/components/Pustakawan/Pengguna/SemuaPengguna/TableSemuaPengguna'
import { useQuery } from '@tanstack/react-query'
import { getAllPengguna } from '@/actions/Pustakawan/PustakawanGetPenggunaActions'
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import { useSearchParams } from 'react-router-dom'
import PenggunaPageLoading from '@/components/Pustakawan/Pengguna/PenggunaPageLoading'

const DaftarSemuaPengguna = () => {

  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const {data, isLoading} = useQuery({
    queryKey: ['semua', 'pengguna', params],
    queryFn: () => getAllPengguna(params.toString())
  })

  if (isLoading) return <PenggunaPageLoading />

  return (
    <Container className='w-full'>
      <PustakawanBreadCrumbs />
      <GrafikPertumbuhanSemuaPengguna monthlyUserGrowData={data.monthlyUserGrowth} userAccountStatusRatio={data.userAccountStatusRatio}/>
      <SemuaPenggunaFilter />
      <TableSemuaPengguna dataPengguna={data.pengguna} />
    </Container>
  )
}

export default DaftarSemuaPengguna