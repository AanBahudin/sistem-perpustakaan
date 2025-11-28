import Container from '@/globals/Container'
import SummaryCard from '@/components/pengguna/DashboardPengguna/SummaryCard'
import LoanOverview from '@/components/pengguna/DashboardPengguna/LoanOverview'
import StatsOverview from '@/components/pengguna/DashboardPengguna/StatsOverview'
import DashboardLoading from './DashboardLoading'
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
      <SummaryCard data={summaryData} />
      <LoanOverview bukuHilang={bukuHilang} peminjaman={peminjaman} perpanjangan={perpanjangan} pengembalian={pengembalian} peminjamanAktif={peminjamanAktif} />
    </Container>
  )
}

export default KatalogPengguna