import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from '../../ui/scroll-area'
import { formatedDate } from "@/utils/formatDate"

const TablePengguna = ({peminjaman} : {peminjaman: any}) => {

  return (
    <Table className='w-full mt-6'>
      {peminjaman.length === 0 && <TableCaption className='my-2'>Belum ada peminjaman</TableCaption>}
    
      <ScrollArea className='w-full h-[250px] p-2'>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead className="w-[500px]">Judul Buku</TableHead>
            <TableHead className="w-[150px] text-center">Status</TableHead>
            <TableHead className="text-center w-[150px]">Kondisi</TableHead>
            <TableHead className="w-[150px] text-center">Durasi</TableHead>
            <TableHead className="text-center">Tanggal</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {peminjaman.map((item: any, index: number) => {
            const {buku, statusPeminjaman:status} = item
            const statusBg = status === 'Dipinjam' ? 'primary' : (status === 'Ditolak' ? 'destructive' : (status === 'Dikembalikan' ? 'primary-foreground' : 'popover' ))
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{buku.judul}</TableCell>
                <TableCell className="text-center">
                  <p className={`w-full bg-${statusBg} flex-1 py-2 rounded text-[12px]`}>
                    {item.statusPeminjaman}
                  </p>
                </TableCell>
                <TableCell className="text-center flex">
                  <p className="bg-popover border flex-1 py-2 rounded text-[12px]">
                    {item.kondisi}
                  </p>
                </TableCell>
                <TableCell className="text-center">{item.durasiPeminjaman} hari</TableCell>
                <TableCell className="text-center">{formatedDate(item.createdAt)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </ScrollArea>
    </Table>

  )
}

export default TablePengguna