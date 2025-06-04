import { ScrollArea } from '@radix-ui/react-scroll-area'
import TablePengguna from './TablePengguna'
import TableTabs from './TableTabs'
import TablePerpanjangan from './TablePerpanjangan'
import { useSelector } from 'react-redux'
import TablePengembalian from './TablePengembalian'

type TableContainerType = {
  peminjaman: any,
  perpanjangan: any,
  pengembalian: any
}

const TableContainer = ({peminjaman, perpanjangan, pengembalian} : TableContainerType) => {

  const {activeTab} = useSelector((state:any) => state.dashboardState)
  
  return (
    <section className='min-h-full col-span-12 lg:col-span-12 bg-primary-foreground dark:bg-card rounded-xl border overflow-x-auto'>
        <ScrollArea className='min-w-[700px]'>
          <div className='p-4'>
            <TableTabs />
            {activeTab === 'peminjaman' && <TablePengguna peminjaman={peminjaman} />}
            {activeTab === 'perpanjangan' && <TablePerpanjangan perpanjangan={perpanjangan} />}
            {activeTab === 'pengembalian' && <TablePengembalian pengembalian={pengembalian} />}
          </div>
        </ScrollArea>
    </section>
  )
}

export default TableContainer