import Container from '@/globals/Container'
import {
  SummaryCardData,
  LoanOverview,
  StatsOverview,
  DashboardLoading
} from '@/components/pengguna/DashboardPengguna'
import useGetStatsPengguna from '@/hooks/fetchHooks/penggunaHooks/dashboard/useGetStatsPengguna'


const KatalogPengguna = () => {

  const {data: statsData, isLoading} = useGetStatsPengguna()  
  if (isLoading) return <DashboardLoading />

  const {
    peminjaman, 
    peminjamanAktif, 
    perpanjangan, 
    pengembalian, 
    summaryData, 
    bukuHilang } = statsData

  return (
    <Container className='my-16'>
      <StatsOverview peminjaman={peminjaman} bukuHilang={bukuHilang} />
      <SummaryCardData data={summaryData} />
      <LoanOverview bukuHilang={bukuHilang} peminjaman={peminjaman} perpanjangan={perpanjangan} pengembalian={pengembalian} peminjamanAktif={peminjamanAktif} />
    </Container>
  )
}

export default KatalogPengguna