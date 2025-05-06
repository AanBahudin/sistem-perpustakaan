import PenggunaCharts from './PenggunaLineCharts'
import PenggunaBarChart from './PenggunaBarChart'

const LoanProgress = () => {
  return (
    <section className='w-full flex gap-x-8 my-6'>
        <PenggunaCharts />
        <PenggunaBarChart />
    </section>
  )
}

export default LoanProgress