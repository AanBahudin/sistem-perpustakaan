import Container from '../../globals/Container'
import { Card } from '@/components/ui/card'
import { ArrowRight, Book } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import TablePengguna from '@/components/pengguna/DashboardPengguna/TablePengguna'
import CalendarPengguna from '@/components/pengguna/DashboardPengguna/CalendarUser'
import { ScrollArea } from '@/components/ui/scroll-area'
import PenggunaCharts from '@/components/pengguna/DashboardPengguna/PenggunaLineCharts'
import PenggunaBarChart from '@/components/pengguna/DashboardPengguna/PenggunaBarChart'
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