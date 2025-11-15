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

const TablePengguna = ({peminjaman} : {peminjaman: any}) => {
  return (
    <div className="w-full mt-6 overflow-hidden rounded">
        <Table className="w-full">
          {peminjaman.length === 0 && (
            <TableCaption className="my-2">Belum ada peminjaman</TableCaption>
          )}
          <TableHeader>
            <TableRow className="border-primary/20">
              <TableHead className="w-[50px] text-center">No</TableHead>
              <TableHead className="w-[500px]">Judul Buku</TableHead>
              <TableHead className="w-[150px] text-center">Status</TableHead>
              <TableHead className="w-[150px] text-center">Kondisi</TableHead>
              <TableHead className="w-[150px] text-center">Durasi</TableHead>
              <TableHead className="text-center">Tanggal</TableHead>
            </TableRow>
          </TableHeader>
        </Table>

      <div className="h-[300px] overflow-y-auto scroll-custom">
        <Table className="w-full">
          <TableBody>
            {peminjaman.map((item:any, index: number) => {
              const { buku, statusPeminjaman: status } = item
              const statusBg =
                status === "Dipinjam"
                  ? "primary"
                  : status === "Ditolak"
                  ? "destructive"
                  : status === "Dikembalikan"
                  ? "primary-foreground"
                  : "popover"
                return (
                  <TableRow key={index} className="group border-primary/20">
                    <TableHead className="font-medium w-[50px] text-center">{index + 1}</TableHead>
                    <TableCell className="group-hover:underline w-[500px]">
                      <Link to={`/my/peminjaman/${item._id}/${buku._id}`}>
                        {buku.judul.slice(0, 67)}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center w-[150px]">
                      <p className={` bg-${statusBg} flex-1 text-center py-2 rounded-lg text-[12px] `}>
                        {item.statusPeminjaman}
                      </p>
                    </TableCell>
                    <TableCell className="text-center w-[150px]">
                      <p className="bg-popover flex-1 w-full py-2 rounded-lg text-[12px]">
                        {item.kondisi || '-'}
                      </p>
                    </TableCell>
                    <TableCell className="text-center w-[150px] ">
                      {item.durasiPeminjaman} hari
                    </TableCell>
                    <TableCell className="text-center flex justify-center">
                      {formatedDate(item.createdAt)}
                    </TableCell>
                  </TableRow>
                )
            })}
          </TableBody>
        </Table>
        </div>
    </div>
  )
}

export default TablePengguna