import TableContainer from './TableContainer'

type LoanOverviewType = {
  peminjaman: any,
  perpanjangan: any,
  pengembalian: any,
  peminjamanAktif: any,
  bukuHilang: any
}

const LoanOverview = ({peminjaman, perpanjangan, pengembalian, peminjamanAktif, bukuHilang} : LoanOverviewType) => {
  return (
    <section className='w-full grid grid-cols-12 mt-4 gap-x-6'>
        <TableContainer bukuHilang={bukuHilang} peminjaman={peminjaman} pengembalian={pengembalian} perpanjangan={perpanjangan} peminjamanAktif={peminjamanAktif} />
    </section>
  )
}

export default LoanOverview