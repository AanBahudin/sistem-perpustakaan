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
import { formatedDate } from "@/utils/formatDate"
import { Link } from 'react-router-dom'

const DeadlineTable = ({peminjamanAktif} : {peminjamanAktif:any}) => {
  return (
    <div className="w-full mt-6 overflow-hidden rounded">
      <Table className='w-full'>
        {peminjamanAktif.length === 0 && (
          <TableCaption className='my-2'>Belum ada peminjaman</TableCaption>
        )}

        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead className="w-[400px]">Judul Buku</TableHead>
            <TableHead className="w-[150px] text-center">Status</TableHead>
            <TableHead className="text-center w-[150px]">Kondisi</TableHead>
            <TableHead className="w-[200px] text-center">Waktu</TableHead>
            <TableHead className="text-center">Tenggat</TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      <div className="h-[300px] overflow-y-auto scroll-custom">
         <Table className='w-full mt-6'>
            <TableBody>
              {peminjamanAktif.reverse().map((item: any, index: number) => {
                const {buku, statusPeminjaman:status} = item
                const statusBg = status === 'Dipinjam' ? 'primary' : (status === 'Ditolak' ? 'destructive' : (status === 'Dikembalikan' ? 'primary-foreground' : 'popover' ))
                return (
                  <TableRow key={index} className='group'>
                      <TableCell className="font-medium w-[50px] text-center">{index + 1}</TableCell>
                      <TableCell className='group-hover:underline w-[400px]'>
                        <Link to={`/my/peminjaman/${item._id}/${buku._id}`}>{buku.judul} </Link>
                      </TableCell>
                      <TableCell className="text-center w-[150px]">
                        <p className={`w-full bg-${statusBg} flex-1 py-2 rounded text-[12px] text-white`}>
                          {item.statusPeminjaman}
                        </p>
                      </TableCell>
                      <TableCell className="text-center w-[150px]">
                        <p className="bg-popover border flex-1 py-2 rounded text-[12px]">
                          {item.kondisi}
                        </p>
                      </TableCell>
                      <TableCell className="text-center w-[200px]">{hitungMundurTanggal(item.berakhirPada)}</TableCell>
                      <TableCell className="text-center">{formatedDate(item.berakhirPada)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
         </Table>
      </div>
    </div>
  )
}

export default DeadlineTable