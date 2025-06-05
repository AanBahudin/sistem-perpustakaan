import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatedDate } from "@/utils/formatDate"
import { Link } from "react-router-dom"

const TablePerpanjangan = ({perpanjangan} : {perpanjangan: any}) => {
  return (
    <div className="w-full mt-6 overflow-hidden rounded">
        <Table className='w-full'>
            {perpanjangan.length === 0 && (
                <TableCaption className='my-2'>Belum ada perpanjangan</TableCaption>
            )}
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">No</TableHead>
                    <TableHead className="w-[350px]">Judul Buku</TableHead>
                    <TableHead className="w-[200px] text-center">Status Perpanjangan</TableHead>
                    <TableHead className="text-center w-[400px]">Alasan</TableHead>
                    <TableHead className="w-[100px] text-center">Durasi</TableHead>
                    <TableHead className="text-center">Tanggal</TableHead>
                </TableRow>
            </TableHeader>
        </Table>

        <div className="h-[300px] overflow-y-auto mnscroll-custom">
            <Table className='w-full mt-6'>
                <TableBody>
                    {perpanjangan.map((item: any, index: number) => {
                        const {idBuku, disetujui:status} = item
                        const statusBg = status === 'Diterima' ? 'primary' : (status === 'Ditolak' ? 'destructive' : 'secondary')
                        return (
                            <TableRow key={index} className="group">
                                <TableCell className="font-medium w-[50px] text-center">{index + 1}</TableCell>
                                <TableCell className="group-hover:underline w-[350px]">
                                    <Link to={`/my/perpanjangan/${item._id}/${idBuku._id}`}>{idBuku.judul.slice(0, 67)}</Link>
                                </TableCell>
                                <TableCell className="text-center w-[200px]">
                                    <p className={`w-full bg-${statusBg} flex-1 py-2 rounded text-[12px]`}>
                                    {item.disetujui}
                                    </p>
                                </TableCell>
                                <TableCell className="text-center text-sm w-[400px]">
                                    <p className="flex-1 text-center text-[12px]">
                                    {item.alasan || '-'}
                                    </p>
                                </TableCell>
                                <TableCell className="text-center w-[100px]">{item.durasi} hari</TableCell>
                                <TableCell className="text-center">{formatedDate(item.createdAt)}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    </div>
  )
}

export default TablePerpanjangan