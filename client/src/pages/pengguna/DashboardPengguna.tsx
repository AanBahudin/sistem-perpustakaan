import Container from '../../globals/Container'
import SummaryCard from '@/components/pengguna/DashboardPengguna/SummaryCard'
import LoanOverview from '@/components/pengguna/DashboardPengguna/LoanOverview'
import LoanProgress from '@/components/pengguna/DashboardPengguna/LoanProgress'
import LoanHighlights from '@/components/pengguna/DashboardPengguna/LoanHighlights'

const KatalogPengguna = () => {
  return (
    <Container className='mt-16'>
      <h1 className='text-3xl font-semibold'>Data Overview</h1>

      <SummaryCard />
      <LoanOverview />
      <LoanProgress />
      <LoanHighlights />
    </Container>
  )
}

export default KatalogPengguna