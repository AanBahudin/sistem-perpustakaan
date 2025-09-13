import { prodiGetSinglePustakawanData } from '@/actions/Prodi/ProdiPustakawanActions'
import PenggunaBreadCrumbs from '@/components/Pustakawan/Pengguna/SinglePengguna/PenggunaBreadCrumbs'
import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import ProdiPustakawanMainProfileContainer from '@/components/Prodi/Pustakawan/ProdiPustakawanMainProfileContainer'
import ProdiPustakawanDetailStats from '@/components/Prodi/Pustakawan/ProdiPustakawanDetailStats'

const DetailPustakawan = () => {

  const {id} = useParams()

  const {data, isLoading} = useQuery({
    queryKey: ['detail', 'pustakawan', id],
    queryFn: () => prodiGetSinglePustakawanData(id as string)
  })

  if (isLoading) return <h1>Loading...</h1>

  return (
    <Container className='w-full'>
      <PenggunaBreadCrumbs title={data.nama} />
      <section className="w-full flex flex-col items-start justify-start gap-x-6 my-6">
        <main className="w-full flex items-start justify-start gap-x-6">
          <ProdiPustakawanMainProfileContainer profil={data.profile} />
          <ProdiPustakawanDetailStats data={data} />
        </main>
      </section>
    </Container>
  )
}
export default DetailPustakawan