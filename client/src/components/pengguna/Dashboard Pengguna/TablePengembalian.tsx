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

type TablePengembalianType = {
    pengembalian: any
}

const TablePengembalian = ({pengembalian} : TablePengembalianType) => {
    return (
        <Table className='w-full mt-6'>
            {pengembalian.length === 0 && <TableCaption className='my-2'>Belum ada pengembalian</TableCaption>}
            
            <ScrollArea className='w-full h-[250px] p-2'>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[50px]">No</TableHead>
                <TableHead className="w-[400px]">Judul Buku</TableHead>
                <TableHead className="w-[200px] text-center">Status</TableHead>
                <TableHead className="text-center w-[200px]">Kondisi</TableHead>
                <TableHead className="w-[200px] text-center">Keterlambatan</TableHead>
                <TableHead className="text-center">Tanggal</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {pengembalian.map((item: any, index: number) => {
                    const {idBuku, statusPengembalian:status} = item
                    const statusBg = status === 'Dikembalikan' ? 'primary' : 'secondary'
                    return (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{idBuku.judul}</TableCell>
                        <TableCell className="text-center">
                        <p className={`w-full bg-${statusBg} flex-1 py-2 rounded text-[12px]`}>
                            {item.statusPengembalian}
                        </p>
                        </TableCell>
                        <TableCell className="text-center flex">
                        <p className="bg-popover border flex-1 py-2 rounded text-[12px]">
                            {item.keadaanBuku}
                        </p>
                        </TableCell>
                        <TableCell className="text-center">{item.durasiKeterlambatan + ' hari' || '-'}</TableCell>
                        <TableCell className="text-center">{formatedDate(item.createdAt)}</TableCell>
                    </TableRow>
                    )
                })}
            </TableBody>
            </ScrollArea>
        </Table>
    )
}

export default TablePengembalian