import Container from '../../../globals/Container'
import SummaryCard from '@/components/pengguna/Dashboard Pengguna/SummaryCard'
import LoanOverview from '@/components/pengguna/Dashboard Pengguna/LoanOverview'
import LoanProgress from '@/components/pengguna/Dashboard Pengguna/LoanProgress'
import LoanHighlights from '@/components/pengguna/Dashboard Pengguna/LoanHighlights'
import { useQuery } from '@tanstack/react-query'
import { getStats } from '@/actions/userActions'

const KatalogPengguna = () => {

  const {data: statsData, isLoading} = useQuery({
    queryKey: ['stats', 'pengguna'],
    queryFn: getStats
  })

  if (isLoading) {
    return <h1>Loading .... </h1>
  }

  const {peminjaman, peminjamanAktif, perpanjangan, pengembalian, summaryData} = statsData

  return (
    <Container className='mt-16'>
      <h1 className='text-3xl font-semibold'>Data Overview</h1>

      <SummaryCard data={summaryData} />
      <LoanOverview peminjaman={peminjaman} perpanjangan={perpanjangan} pengembalian={pengembalian} />
      <LoanProgress />
      <LoanHighlights peminjaman={peminjaman} peminjamanAktif={peminjamanAktif}/>
    </Container>
  )
}

export default KatalogPengguna