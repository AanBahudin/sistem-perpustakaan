import { getAllPerpanjangan } from '@/actions/Pustakawan/pustakawanPerpanjanganActions'
import DetailPengajuanLoading from '@/components/Pustakawan/Pengajuan/DetailPengajuanLoading'
import GrafikPengajuanContainer from '@/components/Pustakawan/Pengajuan/GrafikPengajuanContainer'
import SemuaPerpanjanganFilter from '@/components/Pustakawan/Pengajuan/SemuaPerpanjangan/SemuaPerpanjanganFilter'
import TabelSemuaPerpanjangan from '@/components/Pustakawan/Pengajuan/SemuaPerpanjangan/TabelSemuaPerpanjangan'
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

const PustakawanPerpanjangan = () => {

  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const {isLoading, data} = useQuery({
    queryKey:  ['semua', 'perpanjangan', params],
    queryFn: () => getAllPerpanjangan({query: params})
  })

  if (isLoading) return <DetailPengajuanLoading />
  const {pengajuanPerpanjangan, rasioStatusPerpanjangan, statsPerpanjangan} = data

  return (
    <Container className='w-full'>
      <PustakawanBreadCrumbs />
      <GrafikPengajuanContainer
        dataRasio={rasioStatusPerpanjangan}
        dataStatistik={statsPerpanjangan}
        judulStatistik='Statistik Pertumbuhan Perpanjangan Bulanan'
        judulRasio='Rasio Status Perpanjangan'
        labelDataRasio={['Diterima', 'Pending', 'Ditolak']}
      />
      <SemuaPerpanjanganFilter />
      <TabelSemuaPerpanjangan perpanjangan={pengajuanPerpanjangan} />
    </Container>
  )
}

export default PustakawanPerpanjangan