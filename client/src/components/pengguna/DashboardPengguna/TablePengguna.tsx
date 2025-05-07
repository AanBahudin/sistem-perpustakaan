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

const TablePengguna = () => {
  return (
    <Table className='w-full'>
        <TableCaption className='my-2'>Belum ada peminjaman</TableCaption>
        <ScrollArea className='w-full h-[250px] p-2'>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Judul Buku</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Kondisi</TableHead>
            <TableHead className="text-right">Tanggal</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
              {Array.from({length: 0}).map((_, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>Algoritma Pemrograman</TableCell>
                    <TableCell>Dipinjam</TableCell>
                    <TableCell>Normal</TableCell>
                    <TableCell className="text-right">12 Februari 3001</TableCell>
                  </TableRow>
                )
              })}
        </TableBody>
        </ScrollArea>
    </Table>

  )
}

export default TablePengguna