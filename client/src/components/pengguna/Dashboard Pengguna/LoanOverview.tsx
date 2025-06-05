import TableContainer from './TableContainer'

type LoanOverviewType = {
  peminjaman: any,
  perpanjangan: any,
  pengembalian: any,
  peminjamanAktif: any
}

const LoanOverview = ({peminjaman, perpanjangan, pengembalian, peminjamanAktif} : LoanOverviewType) => {
  return (
    <section className='w-full grid grid-cols-12 mt-6 gap-x-6'>
        {/* TABLE */}
        <TableContainer peminjaman={peminjaman} pengembalian={pengembalian} perpanjangan={perpanjangan} peminjamanAktif={peminjamanAktif} />
        {/* <CalendarPengguna /> */}
    </section>
  )
}

export default LoanOverview