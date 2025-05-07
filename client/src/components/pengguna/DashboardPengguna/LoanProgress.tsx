import PenggunaLineCharts from './PenggunaLineCharts'
import PenggunaBarChart from './PenggunaBarChart'

const LoanProgress = () => {
  return (
    <section className='w-full flex gap-x-8 my-6'>
        <PenggunaLineCharts />
        <PenggunaBarChart />
    </section>
  )
}

export default LoanProgress