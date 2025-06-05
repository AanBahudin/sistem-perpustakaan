import { hitungMundurTanggal } from '@/utils/hitungMundurTanggal'
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
import { Link } from 'react-router-dom'

const DeadlineTable = ({peminjamanAktif} : {peminjamanAktif:any}) => {
  return (
    <Table className='w-full mt-6'>
      {peminjamanAktif.length === 0 && <TableCaption className='my-2'>Belum ada peminjaman</TableCaption>}
    
      <ScrollArea className='w-full h-[450px] p-2'>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead className="w-[500px]">Judul Buku</TableHead>
            <TableHead className="w-[150px] text-center">Status</TableHead>
            <TableHead className="text-center w-[150px]">Kondisi</TableHead>
            <TableHead className="w-[150px] text-center">Waktu</TableHead>
            <TableHead className="text-center">Tenggat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {peminjamanAktif.reverse().map((item: any, index: number) => {
            const {buku, statusPeminjaman:status} = item
            const statusBg = status === 'Dipinjam' ? 'primary' : (status === 'Ditolak' ? 'destructive' : (status === 'Dikembalikan' ? 'primary-foreground' : 'popover' ))
            return (
              <TableRow key={index} className='group'>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className='group-hover:underline'>
                    <Link to={`/my/peminjaman/${item._id}/${buku._id}`}>{buku.judul} </Link>
                  </TableCell>
                  <TableCell className="text-center">
                    <p className={`w-full bg-${statusBg} flex-1 py-2 rounded text-[12px] text-white`}>
                      {item.statusPeminjaman}
                    </p>
                  </TableCell>
                  <TableCell className="text-center flex">
                    <p className="bg-popover border flex-1 py-2 rounded text-[12px]">
                      {item.kondisi}
                    </p>
                  </TableCell>
                  <TableCell className="text-center">{hitungMundurTanggal(item.berakhirPada)}</TableCell>
                  <TableCell className="text-center">{formatedDate(item.berakhirPada)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </ScrollArea>
    </Table>
  )
}

export default DeadlineTable