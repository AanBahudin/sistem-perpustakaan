import GrafikPertumbuhanSemuaPengguna from '@/components/Pustakawan/Pengguna/SemuaPengguna/GrafikPertumbuhanSemuaPengguna'
import SemuaPenggunaFilter from '@/components/Pustakawan/Pengguna/SemuaPengguna/SemuaPenggunaFilter'
import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import { useSearchParams } from 'react-router-dom'
import PenggunaPageLoading from '@/components/Pustakawan/Pengguna/PenggunaPageLoading'
import { prodiGetAllPenggunaAction } from '@/actions/Prodi/Pengguna'
import ProdiSemuaPenggunaTable from '@/components/Prodi/Pengguna/SemuaPengguna/ProdiSemuaPenggunaTable'
import TambahPenggunaBaruDialog from './TambahPenggunaBaruDialog'

const ProdiSemuaPenggunaPage = () => {

  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const {data, isLoading} = useQuery({
    queryKey: ['semua', 'pengguna', params],
    queryFn: () => prodiGetAllPenggunaAction(params.toString())
  })

  if (isLoading) return <PenggunaPageLoading />

  return (
    <Container className='w-full'>

      <section className='w-full flex items-center justify-between'>
        <PustakawanBreadCrumbs />
        <TambahPenggunaBaruDialog />
      </section>

      <GrafikPertumbuhanSemuaPengguna monthlyUserGrowData={data.monthlyUserGrowth} userAccountStatusRatio={data.userAccountStatusRatio}/>
      <SemuaPenggunaFilter />
      <ProdiSemuaPenggunaTable dataPengguna={data.pengguna} />
    </Container>
  )
}

export default ProdiSemuaPenggunaPage