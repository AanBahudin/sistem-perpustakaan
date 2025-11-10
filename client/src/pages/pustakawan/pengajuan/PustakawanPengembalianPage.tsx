import { getAllPengembalian } from '@/actions/Pustakawan/pustakawanPengembalianActions'
import DataPagination from '@/components/pengguna/peminjaman Pengguna/DataPagination'
import DetailPengajuanLoading from '@/components/Pustakawan/Pengajuan/DetailPengajuanLoading'
import GrafikPengajuanContainer from '@/components/Pustakawan/Pengajuan/GrafikPengajuanContainer'
import SemuaPengembalianFilter from '@/components/Pustakawan/Pengajuan/SemuaPengembalian/SemuaPengembalianFilter'
import TabelSemuaPengembalian from '@/components/Pustakawan/Pengajuan/SemuaPengembalian/TabelSemuaPengembalian'
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

const PustakawanPengembalianPage = () => {

  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const {isLoading, data} = useQuery({
    queryKey:  ['semua', 'pengembalian', params],
    queryFn: () => getAllPengembalian({query: params})
  })

  if (isLoading) return <DetailPengajuanLoading />
  const {pengajuanPengembalian, rasioStatusPengembalian, statsPengembalian, totalPage} = data

  return (
    <Container className='w-full'>
      <PustakawanBreadCrumbs />
      <GrafikPengajuanContainer
        dataRasio={rasioStatusPengembalian}
        dataStatistik={statsPengembalian}
        judulStatistik='Statistik Pertumbuhan Pengembalian Bulanan'
        judulRasio='Rasio Status Pengembalian'
        labelDataRasio={['Dikembalikan', 'Pending']}
      />
      <SemuaPengembalianFilter />
      <TabelSemuaPengembalian pengembalian={pengajuanPengembalian} />
      {pengajuanPengembalian.length !== 0 && <DataPagination totalPage={totalPage} />}
      
    </Container>
  )
}

export default PustakawanPengembalianPage