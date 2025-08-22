import Container from '@/globals/Container'
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import { useQuery } from '@tanstack/react-query'
import { getAllPengajuanPeminjaman } from '@/actions/Pustakawan/pustakawanPengajuanActions'
import GrafikPengajuanContainer from '@/components/Pustakawan/Pengajuan/GrafikPengajuanContainer'
import TabelSemuaPeminjaman from '@/components/Pustakawan/Pengajuan/SemuaPeminjaman/TabelSemuaPeminjaman'
import SemuaPeminjamanFilter from '@/components/Pustakawan/Pengajuan/SemuaPeminjaman/SemuaPeminjamanFilter'
import { useSearchParams } from 'react-router-dom'
import DetailPengajuanLoading from '@/components/Pustakawan/Pengajuan/DetailPengajuanLoading'

const PustakawanPeminjaman = () => {

  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const {data, isLoading} = useQuery({
    queryKey: ['semua', 'peminjaman', params],
    queryFn: () => getAllPengajuanPeminjaman({params})
  })

  if (isLoading) return <DetailPengajuanLoading />
  const { pengajuanPeminjaman, rasioStatusPeminjaman, statsPeminjaman } = data

  return (
    <Container className='w-full'>
      <PustakawanBreadCrumbs />
      <GrafikPengajuanContainer 
        dataRasio={rasioStatusPeminjaman}
        dataStatistik={statsPeminjaman}
        judulStatistik='Statistik Pertumbuhan Peminjaman Bulanan'
        judulRasio='Rasio Status Peminjaman'
        labelDataRasio={['Dipinjam', 'Dikembalikan', 'Terlambat', 'Diajukan', 'Ditolak']}
      />
      <SemuaPeminjamanFilter />
      <TabelSemuaPeminjaman peminjaman={pengajuanPeminjaman} />
    </Container>
  )
}

export default PustakawanPeminjaman