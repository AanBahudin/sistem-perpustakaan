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

const TablePerpanjangan = ({perpanjangan} : {perpanjangan: any}) => {
  return (
    <Table className='w-full mt-6'>
        {perpanjangan.length === 0 && <TableCaption className='my-2'>Belum ada perpanjangan</TableCaption>}
        <ScrollArea className='w-full h-[250px] p-2'>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead className="w-[350px]">Judul Buku</TableHead>
            <TableHead className="w-[150px] text-center">Status</TableHead>
            <TableHead className="text-center w-[400px]">Alasan</TableHead>
            <TableHead className="w-[100px] text-center">Durasi Perpanjangan</TableHead>
            <TableHead className="text-center">Tanggal</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {perpanjangan.map((item: any, index: number) => {
            const {idBuku, disetujui:status} = item
            const statusBg = status === 'Diterima' ? 'primary' : (status === 'Ditolak' ? 'destructive' : 'secondary')
            return (
                <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{idBuku.judul}</TableCell>
                    <TableCell className="text-center">
                        <p className={`w-full bg-${statusBg} flex-1 py-2 rounded text-[12px]`}>
                        {item.disetujui}
                        </p>
                    </TableCell>
                    <TableCell className="text-center text-sm">
                        <p className="flex-1 text-center text-[12px]">
                        {item.alasan || '-'}
                        </p>
                    </TableCell>
                    <TableCell className="text-center">{item.durasi} hari</TableCell>
                    <TableCell className="text-center">{formatedDate(item.createdAt)}</TableCell>
                </TableRow>
            )
            })}
        </TableBody>
        </ScrollArea>
    </Table>
  )
}

export default TablePerpanjangan