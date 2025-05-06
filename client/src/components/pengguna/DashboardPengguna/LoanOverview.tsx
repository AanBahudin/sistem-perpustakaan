import TablePeminjaman from './TablePeminjaman'
import CalendarPengguna from './CalendarUser'

const LoanOverview = () => {
  return (
    <section className='w-full grid grid-cols-12 mt-6'>
        {/* TABLE */}
        <TablePeminjaman />
        <CalendarPengguna />
    </section>
  )
}

export default LoanOverview