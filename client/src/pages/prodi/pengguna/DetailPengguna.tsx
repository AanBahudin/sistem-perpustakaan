import { prodiGetDetailPenggunaAction } from '@/actions/Prodi/Pengguna'
import DetailPenggunaLoading from '@/components/Pustakawan/Pengguna/DetailPenggunaLoading'
import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'
import { Calendar } from '@/components/ui/calendar'
import { useParams } from 'react-router-dom'
import StatsProfileContainer from '@/components/Pustakawan/Pengguna/SinglePengguna/StatsProfileContainer'
import MainProfileContainer from '@/components/Pustakawan/Pengguna/SinglePengguna/MainProfileContainer'
import ActivityInfoContainer from '@/components/Pustakawan/Pengguna/SinglePengguna/ActivityInfoContainer'
import PenggunaBreadCrumbs from '@/components/Pustakawan/Pengguna/SinglePengguna/PenggunaBreadCrumbs'

const DetailPengguna = () => {

  const {id: idParams} = useParams()

  const {isLoading, data} = useQuery({
    queryKey: ['single', 'pengguna', idParams],
    queryFn: () => prodiGetDetailPenggunaAction(idParams as string)
  })

  if (isLoading) return <DetailPenggunaLoading />
  const {pengguna, peminjaman, perpanjangan, pengembalian} = data

  const ratioData = [
    peminjaman.length || 0,
    perpanjangan.length || 0,
    pengembalian.length || 0,
    pengguna.bukuDihilangkan
  ]

  return (
    <Container className='w-full'>
      <PenggunaBreadCrumbs title={pengguna.nama} />

      <section className="w-full min-h-[40vh] flex justify-start items-stretch  gap-x-4">
        <MainProfileContainer data={pengguna} />
        <StatsProfileContainer nama={pengguna.nama} ratioData={ratioData} />
        <Calendar className="border rounded-xl" />
      </section>

      <ActivityInfoContainer
        pengguna={pengguna} 
        peminjaman={peminjaman}
        perpanjangan={perpanjangan}
        pengembalian={pengembalian}
      />
    </Container>
  )
}

export default DetailPengguna