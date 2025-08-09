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
import { Link2 } from "lucide-react"
import GlobalTooltip from "@/globals/GlobalTooltip"

const TabelSemuaPeminjaman = ({peminjaman} : {peminjaman : any}) => {
  return (
    <section className="w-full flex-1 overflow-auto scroll-custom">
        <section className="w-full h-full border rounded overflow-hidden">
            <Table className="w-full text-sm">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px] text-xs text-center px-0">No</TableHead>
                        <TableHead className="w-[200px] text-xs">Judul Buku</TableHead>
                        <TableHead className="w-[120px] text-center text-xs">Pengguna</TableHead>
                        <TableHead className="w-[120px] text-xs text-center">Kategori</TableHead>
                        <TableHead className="w-[120px] text-center text-xs">Durasi</TableHead>
                        <TableHead className="w-[120px] text-center text-xs">Status</TableHead>
                        <TableHead className="w-[120px] text-xs text-center">Tgl Pengajuan</TableHead>
                    </TableRow>
                </TableHeader>

                {peminjaman.length === 0 ? (
                    <TableCaption className="mt-20">Belum ada peminjaman</TableCaption>
                ) : (
                    <TableBody>
                        {peminjaman.map((item: any, index: number) => {
                            const {buku, peminjam} = item
                            return (
                                <TableRow key={index} className="border-accent-foreground/10 even:bg-accent/10" >
                                    <TableCell className="w-[50px] text-xs text-center px-0">{index + 1}</TableCell>
                                    <TableCell className="w-[200px] text-xs">{buku.judul}</TableCell>
                                    <TableCell className="w-[120px] text-center text-xs">
                                        <div className="w-full flex items-center justify-center gap-x-2">
                                            {peminjam.fotoProfil ? (
                                                <img src={peminjam.fotoProfil} className="w-4 h-4 object-cover rounded-full" />
                                            ) : (
                                                <div className="w-4 h-4 rounded-full flex items-center justify-center text-[12px]">{peminjam.nama[0]}</div>
                                            )}
                                            {peminjam.nama}
                                        </div>
                                    </TableCell>
                                    <TableCell className="w-[120px] text-center text-xs">{item.buku.kategori[0]}</TableCell>
                                    <TableCell className="w-[120px] text-center text-xs">{item.durasiPeminjaman} Hari </TableCell>
                                    <TableCell className="w-[120px] text-center text-xs">{item.statusPeminjaman}</TableCell>
                                    <TableCell className="w-[120px] text-center text-xs">{formatedDate(item.createdAt)}</TableCell>
                                    <TableCell className="w-[50px] text-center text-xs">
                                        <div className="w-6  h-6 p-1 rounded-full hover:bg-muted duration-200 ease-in-out flex items-center justify-center">
                                            <GlobalTooltip text="Lihat Detail">
                                                <Link2 className="w-3 h-3" />
                                            </GlobalTooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                )}
            </Table>
        </section>
    </section>
  )
}

export default TabelSemuaPeminjaman