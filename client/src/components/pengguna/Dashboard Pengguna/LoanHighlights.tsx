import DeadlineTable from './DeadlineTable'
import PinjamanTerakhir from './PinjamanTerakhir'

type LoanHighlightsType = {
  peminjaman: any,
  peminjamanAktif: any
}

const LoanHighlights = ({peminjaman, peminjamanAktif} : LoanHighlightsType) => {
  return (
    <section className='w-full my-6 grid grid-cols-12 gap-x-6 gap-y-6'>
        <PinjamanTerakhir peminjaman={peminjaman} />
        <DeadlineTable peminjaman={peminjamanAktif} />
      </section>
  )
}

export default LoanHighlights