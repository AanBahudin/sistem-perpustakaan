import Container from "@/globals/Container"
import PustakawanBreadCrumbs from "@/components/Pustakawan/PustakawanBreadCrumbs"
import TambahPenggunaBaruDialog from "./TambahPenggunaBaruDialog"
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { prodiGetRequestedUser } from "@/actions/Prodi/ProdiPenggunaActions"
import PenggunaPageLoading from "@/components/Pustakawan/Pengguna/PenggunaPageLoading"
import GrafikPertumbuhanSemuaPengguna from '@/components/Pustakawan/Pengguna/SemuaPengguna/GrafikPertumbuhanSemuaPengguna'
import SemuaPenggunaFilter from '@/components/Pustakawan/Pengguna/SemuaPengguna/SemuaPenggunaFilter'
import ProdiSemuaPenggunaTable from '@/components/Prodi/Pengguna/SemuaPengguna/ProdiSemuaPenggunaTable'

const ProdiPengajuanPenggunaPage = () => {

  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const {data, isLoading} = useQuery({
    queryKey: ['pengajuan', 'pengguna', params],
    queryFn: () => prodiGetRequestedUser(params.toString())
  })

  if (isLoading) return <PenggunaPageLoading />

  return (
    <Container className="w-full">
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

export default ProdiPengajuanPenggunaPage