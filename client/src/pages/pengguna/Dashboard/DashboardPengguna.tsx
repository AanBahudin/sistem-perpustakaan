import Container from '../../../globals/Container'
import SummaryCard from '@/components/pengguna/Dashboard Pengguna/SummaryCard'
import LoanOverview from '@/components/pengguna/Dashboard Pengguna/LoanOverview'
import LoanProgress from '@/components/pengguna/Dashboard Pengguna/LoanProgress'
import LoanHighlights from '@/components/pengguna/Dashboard Pengguna/LoanHighlights'

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