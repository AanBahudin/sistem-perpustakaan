import { ScrollArea } from '@radix-ui/react-scroll-area'
import TablePengguna from './TablePengguna'

const TablePeminjaman = () => {
  return (
    <div className='min-h-full col-span-12 lg:col-span-9 bg-primary-foreground dark:bg-card rounded-xl border overflow-x-auto'>
        <ScrollArea className='min-w-[700px]'>
          <TablePengguna />
        </ScrollArea>
    </div>
  )
}

export default TablePeminjaman