import PenggunaLineCharts from './PenggunaLineCharts'
import PenggunaBarChart from './PenggunaBarChart'
import Recommendation from './Recommendation'

const LoanProgress = () => {
  return (
    <section className='w-full flex gap-x-4 my-6'>
        <PenggunaLineCharts />
        <PenggunaBarChart />
        <Recommendation />
    </section>
  )
}

export default LoanProgress