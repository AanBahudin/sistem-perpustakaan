import TablePengguna from './TablePengguna'
import TableTabs from './TableTabs'
import TablePerpanjangan from './TablePerpanjangan'
import { useSelector } from 'react-redux'
import TablePengembalian from './TablePengembalian'
import DeadlineTable from './DeadlineTable'

type TableContainerType = {
  peminjaman: any,
  perpanjangan: any,
  pengembalian: any,
  peminjamanAktif: any
}

const TableContainer = ({peminjaman, perpanjangan, pengembalian, peminjamanAktif} : TableContainerType) => {

  const {activeTab} = useSelector((state:any) => state.dashboardState)
  console.log(activeTab === 'deadline')
  return (
    <section className='min-h-full col-span-12 lg:col-span-12 bg-primary-foreground dark:bg-card rounded-xl border overflow-x-auto'>
        <section className='min-w-[700px]'>
          <section className='p-4'>
            <TableTabs />
            {activeTab === 'peminjaman' && <TablePengguna peminjaman={peminjaman} />}
            {activeTab === 'perpanjangan' && <TablePerpanjangan perpanjangan={perpanjangan} />}
            {activeTab === 'pengembalian' && <TablePengembalian pengembalian={pengembalian} />}
            {activeTab === 'deadline' && <DeadlineTable peminjamanAktif={peminjamanAktif} />}
          </section>
        </section>
    </section>
  )
}

export default TableContainer