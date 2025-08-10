import Container from '@/globals/Container'
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import { useQuery } from '@tanstack/react-query'
import { getAllPengajuanPeminjaman } from '@/actions/Pustakawan/pustakawanPengajuanActions'
import GrafikPengajuanContainer from '@/components/Pustakawan/Pengajuan/GrafikPengajuanContainer'
import TabelSemuaPeminjaman from '@/components/Pustakawan/Pengajuan/SemuaPeminjaman/TabelSemuaPeminjaman'
import SemuaPeminjamanFilter from '@/components/Pustakawan/Pengajuan/SemuaPeminjaman/SemuaPeminjamanFilter'

const PustakawanPeminjaman = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['semua', 'peminjaman'],
    queryFn: getAllPengajuanPeminjaman
  })


  if (isLoading) return <h1>Loading ... </h1>
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