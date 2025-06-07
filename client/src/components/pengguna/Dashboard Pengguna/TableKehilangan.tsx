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

const TableKehilangan = ({bukuHilang} : {bukuHilang: any}) => {
  return (
    <div className="w-full mt-6 overflow-hidden rounded">
        <Table className='w-full'>
            
            <TableHeader>
                <TableRow className="border-primary/20">
                    <TableHead className="w-[50px] text-center">No</TableHead>
                    <TableHead className="w-[350px]">Judul Buku</TableHead>
                    <TableHead className="w-[200px] text-center">ID Peminjaman</TableHead>
                    <TableHead className="w-[100px] text-center">Denda</TableHead>
                    <TableHead className="text-center">Tanggal</TableHead>
                </TableRow>
            </TableHeader>
        </Table>

        <div className="h-[300px] overflow-y-auto mnscroll-custom">
            <Table className='w-full'>
                {bukuHilang.length === 0 && (
                    <TableCaption className=''>Belum ada buku dihilangkan</TableCaption>
                )}
                <TableBody>
                    {bukuHilang.map((item: any, index: number) => {
                        const {idBuku, disetujui:status} = item
                        const statusBg = status === 'Diterima' ? 'primary' : (status === 'Ditolak' ? 'destructive' : 'popover')
                        return (
                            <TableRow key={index} className="group border-primary/20">
                                <TableCell className="font-medium w-[50px] text-center">{index + 1}</TableCell>
                                <TableCell className="group-hover:underline w-[350px]">
                                    <Link to={`/my/perpanjangan/${item._id}/${idBuku._id}`}>{idBuku.judul.slice(0, 67)}</Link>
                                </TableCell>
                                <TableCell className="text-center w-[200px]">
                                    <p className={`w-full bg-${statusBg} flex-1 py-2 rounded-lg text-[12px]`}>
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

export default TableKehilangan