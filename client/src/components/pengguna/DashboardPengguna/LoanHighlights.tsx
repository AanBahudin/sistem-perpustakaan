import DeadlineTable from './DeadlineTable'
import PinjamanTerakhir from './PinjamanTerakhir'

const LoanHighlights = () => {
  return (
    <section className='w-full my-10 flex gap-x-6'>
        <PinjamanTerakhir />
        <DeadlineTable />
      </section>
  )
}

export default LoanHighlights