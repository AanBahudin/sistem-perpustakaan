import { Link } from "react-router-dom"
import {
  Table,  
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const RiwayatBukuTable = ({data} : {data: any}) => {
    const {peminjaman} = data
    return (
        <section className="flex flex-col items-start justify-start border bg-accent/40 w-full rounded-2xl max-h-[40vh] overflow-y-clip px-3 py-5 ">
            <main className="w-full flex items-center h-fit justify-between">
                <h3 className="font-semibold capitalize">Riwayat Buku dipinjam</h3>
                <Link to={'/pustakawan/buku'} className="text-xs text-muted-foreground hover:underline ease-in-out duration-200">Lihat semua</Link>
            </main>

            {/* TABLE */}
            <main className="w-full h-fit mt-4">
                <Table className="w-full text-sm">
                    <TableHeader>
                        <TableRow className="border-accent-foreground/20">
                            <TableHead className="w-[50px] text-xs text-center px-0">No</TableHead>
                            <TableHead className="w-[200px] text-xs">Judul Buku</TableHead>
                            <TableHead className="w-[120px] text-xs text-center">Jenis</TableHead>
                            <TableHead className="w-[120px] text-center text-xs">Status</TableHead>
                            <TableHead className="w-[120px] text-xs text-center">Pengguna</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>

            </main>

            <div className="w-full h-full overflow-y-scroll scroll-custom flex-1 mt-2">
                <Table className="w-full">
                    <TableBody>
                        {peminjaman.map((item: any, index: number) => {
                            const {buku} = item
                            const {peminjam} = item
                            return (
                                <TableRow key={index} className="border-accent-foreground/10 not-even:bg-accent-foreground/10">
                                    <TableCell className="w-[50px] text-xs text-center px-0">{index + 1}</TableCell>
                                    <TableCell className="w-[200px] text-xs">{buku.judul}</TableCell>
                                    <TableCell className="w-[120px] text-center text-xs">{buku.kategori[0]}</TableCell>
                                    <TableCell className="w-[120px] text-center text-xs">{item.statusPeminjaman}</TableCell>
                                    <TableCell className="w-[120px] text-center text-xs">{peminjam.nama}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}

export default RiwayatBukuTable