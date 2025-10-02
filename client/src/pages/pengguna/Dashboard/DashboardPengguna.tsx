import Container from '../../../globals/Container'
import SummaryCard from '@/components/pengguna/Dashboard Pengguna/SummaryCard'
import LoanOverview from '@/components/pengguna/Dashboard Pengguna/LoanOverview'
import { useQuery } from '@tanstack/react-query'
import { getStats } from '@/actions/userActions'
import StatsOverview from '@/components/pengguna/Dashboard Pengguna/StatsOverview'
import DashboardLoading from './DashboardLoading'
const KatalogPengguna = () => {

  const {data: statsData, isLoading} = useQuery({
    queryKey: ['stats', 'pengguna'],
    queryFn: getStats
  })

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