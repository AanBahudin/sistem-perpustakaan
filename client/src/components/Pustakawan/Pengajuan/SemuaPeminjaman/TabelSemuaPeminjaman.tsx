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
import { useNavigate, useSearchParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import TabelDropdownMenu from "../TabelDropdownMenu"
import NewBadge from "../NewBadge"

const TabelSemuaPeminjaman = ({peminjaman} : {peminjaman : any}) => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const handleNavigate = (id: string) => {
        navigate(`${id}`)
    }

    return (
        <section className="w-full flex-1 overflow-auto scroll-custom">
            <section className="w-full min-h-[50vh] border rounded overflow-hidden">
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
                        <TableCaption className="mt-20">
                            {searchParams ? 'Data tidak ditemukan' : 'Belum ada peminjaman'}
                        </TableCaption>
                    ) : (
                        <TableBody>
                            {peminjaman.map((item: any, index: number) => {
                                const {buku, peminjam} = item
                                return (
                                    <TableRow key={index} onClick={() => handleNavigate(item._id)} className="border-accent-foreground/10 even:bg-accent/10 hover:bg-primary/10 ease-in-out duration-200 cursor-default" >
                                        <TableCell className="w-[50px] text-xs text-center px-0">{index + 1}</TableCell>
                                        <TableCell className="w-[200px]  text-xs flex items-center gap-x-2">
                                            {buku.judul.slice(0, 30)}
                                            {!item.isOpen && <NewBadge />}
                                        </TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">
                                            <div className="w-full flex items-center justify-center gap-x-2">
                                                {peminjam?.fotoProfil ? (
                                                    <img src={peminjam?.fotoProfil} className="w-4 h-4 object-cover rounded-full" />
                                                ) : (
                                                    <div className="w-4 h-4 rounded-full flex items-center justify-center text-[12px]">{peminjam.nama[0]}</div>
                                                )}
                                                {peminjam.nama}
                                            </div>
                                        </TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">{item.buku.kategori[0]}</TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">{item.durasiPeminjaman} Hari </TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">
                                            <StatusPeminjamanBadge statusPeminjaman={item.statusPeminjaman} />
                                        </TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">{formatedDate(item.createdAt)}</TableCell>
                                        <TableCell className="w-[50px] text-center text-xs">
                                            <TabelDropdownMenu
                                                idPeminjaman={item._id}
                                                idPengembalian={item.dataPengembalian}
                                                idPengguna={peminjam._id}
                                            />
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

export const StatusPeminjamanBadge = ({statusPeminjaman} : {statusPeminjaman: string}) => {

    if (statusPeminjaman === 'Ditolak') return <Badge variant='destructive' className="w-[80%] text-center text-white">{statusPeminjaman}</Badge>
    if (statusPeminjaman === 'Dikembalikan') return <Badge  className="w-[80%] text-center text-white bg-primary/60">{statusPeminjaman}</Badge>
    if (statusPeminjaman === 'Pending') return <Badge variant='secondary' className="w-[80%] text-center text-white">{statusPeminjaman}</Badge>
    if (statusPeminjaman === 'Terlambat') return <Badge variant='outline' className="w-[80%] text-center text-white">{statusPeminjaman}</Badge>

    return (
        <Badge className="w-[80%] text-center text-white">{statusPeminjaman}</Badge>
    )
}