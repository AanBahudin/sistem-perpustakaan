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

type TablePengembalianType = {
    pengembalian: any
}

const TablePengembalian = ({pengembalian} : TablePengembalianType) => {
    return (
         <div className="w-full mt-6 overflow-hidden rounded">
            <Table className='w-full'>
                {pengembalian.length === 0 && (
                    <TableCaption className='my-2'>Belum ada pengembalian</TableCaption>
                )}
                <TableHeader>
                    <TableRow className="border-primary/20">
                        <TableHead className="w-[50px] text-center">No</TableHead>
                        <TableHead className="w-[400px]">Judul Buku</TableHead>
                        <TableHead className="w-[200px] text-center">Status</TableHead>
                        <TableHead className="text-center w-[200px]">Kondisi</TableHead>
                        <TableHead className="w-[200px] text-center">Keterlambatan</TableHead>
                        <TableHead className="text-center">Tanggal</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>

            <div className="h-[300px] overflow-y-auto scroll-custom">
                <Table className='w-full'>
                    <TableBody>
                        {pengembalian.map((item: any, index: number) => {
                            const {idBuku, statusPengembalian:status} = item
                            const statusBg = status === 'Dikembalikan' ? 'primary' : 'popover'
                            return (
                            <TableRow key={index} className="group border-primary/20">
                                <TableCell className="font-medium text-center w-[50px]">{index + 1}</TableCell>
                                <TableCell className="group-hover:underline w-[400px]">
                                    <Link to={`/my/pengembalian/${item._id}/${idBuku._id}`}>{idBuku.judul.slice(0, 69)}</Link>
                                </TableCell>
                                <TableCell className="text-center w-[200px]">
                                    <p className={`w-full bg-${statusBg} flex-1 py-2 rounded-lg text-[12px]`}>
                                        {item.statusPengembalian}
                                    </p>
                                </TableCell>
                                <TableCell className="text-center w-[200px]">
                                <p className="bg-popover flex-1 py-2 rounded-lg text-[12px]">
                                    {item.keadaanBuku}
                                </p>
                                </TableCell>
                                <TableCell className="text-center w-[200px]">{item.durasiKeterlambatan + ' hari' || '-'}</TableCell>
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

export default TablePengembalian