import GrafikPertumbuhanSemuaPengguna from '@/components/Pustakawan/Pengguna/SemuaPengguna/GrafikPertumbuhanSemuaPengguna'
import SemuaPenggunaFilter from '@/components/Pustakawan/Pengguna/SemuaPengguna/SemuaPenggunaFilter'
import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import { useSearchParams } from 'react-router-dom'
import PenggunaPageLoading from '@/components/Pustakawan/Pengguna/PenggunaPageLoading'
import { prodiGetAllPengguna } from '@/actions/Prodi/ProdiPenggunaActions'
import ProdiSemuaPenggunaTable from '@/components/Prodi/Pengguna/SemuaPengguna/ProdiSemuaPenggunaTable'

const ProdiSemuaPenggunaPage = () => {

  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const {data, isLoading} = useQuery({
    queryKey: ['semua', 'pengguna', params],
    queryFn: () => prodiGetAllPengguna(params.toString())
  })

  if (isLoading) return <PenggunaPageLoading />

  return (
    <Container className='w-full'>
      <PustakawanBreadCrumbs />
      <GrafikPertumbuhanSemuaPengguna monthlyUserGrowData={data.monthlyUserGrowth} userAccountStatusRatio={data.userAccountStatusRatio}/>
      <SemuaPenggunaFilter />
      <ProdiSemuaPenggunaTable dataPengguna={data.pengguna} />
    </Container>
  )
}

export default ProdiSemuaPenggunaPage