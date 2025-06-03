import PenggunaLineCharts from './PenggunaLineCharts'
import PenggunaBarChart from './PenggunaBarChart'
import Recommendation from './Recommendation'

const LoanProgress = () => {
  return (
    <section className='w-full grid grid-cols-12 gap-x-4 gap-y-4 lg:gap-y-0 my-6'>
        <PenggunaLineCharts />
        <PenggunaBarChart />
        <Recommendation />
    </section>
  )
}

export default LoanProgress