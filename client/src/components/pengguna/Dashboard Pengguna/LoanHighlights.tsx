import DeadlineTable from './DeadlineTable'
import PinjamanTerakhir from './PinjamanTerakhir'

const LoanHighlights = () => {
  return (
    <section className='w-full my-6 grid grid-cols-12 gap-x-6 gap-y-6'>
        <PinjamanTerakhir />
        <DeadlineTable />
      </section>
  )
}

export default LoanHighlights