import TablePengguna from './TablePengguna'
import TableTabs from './TableTabs'
import TablePerpanjangan from './TablePerpanjangan'
import { useSelector } from 'react-redux'
import TablePengembalian from './TablePengembalian'
import DeadlineTable from './DeadlineTable'
import TableKehilangan from './TableKehilangan'

type TableContainerType = {
  peminjaman: any,
  perpanjangan: any,
  pengembalian: any,
  peminjamanAktif: any,
  bukuHilang: any
}

const TableContainer = ({peminjaman, perpanjangan, pengembalian, peminjamanAktif, bukuHilang} : TableContainerType) => {

  const {activeTab} = useSelector((state:any) => state.dashboardState)
  return (
    <section className='min-h-full col-span-12 lg:col-span-12 rounded-xl border-2 overflow-x-auto bg-primary/20'>
        <section className='min-w-[700px]'>
          <section className='p-4'>
            <TableTabs />
            {activeTab === 'peminjaman' && <TablePengguna peminjaman={peminjaman} />}
            {activeTab === 'perpanjangan' && <TablePerpanjangan perpanjangan={perpanjangan} />}
            {activeTab === 'pengembalian' && <TablePengembalian pengembalian={pengembalian} />}
            {activeTab === 'deadline' && <DeadlineTable peminjamanAktif={peminjamanAktif} />}
            {activeTab === 'hilang' && <TableKehilangan bukuHilang={bukuHilang}/>}
          </section>
        </section>
    </section>
  )
}

export default TableContainer