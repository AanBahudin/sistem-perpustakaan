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

import TabelDropdownMenu from "../TabelDropdownMenu"
import { Badge } from "@/components/ui/badge"

const TabelSemuaPerpanjangan = ({perpanjangan} : {perpanjangan: any}) => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const handleNavigate = (id: string) => {
        navigate(id)
    }
    return (
        <section className="w-full flex-1 overflow-auto scroll-custom">
            <section className="w-full min-h-[50vh] border rounded overflow-hidden flex items-start">
                <Table className="w-full text-sm">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px] text-xs text-center px-0">No</TableHead>
                            <TableHead className="w-[200px] text-xs">Judul Buku</TableHead>
                            <TableHead className="w-[120px] text-center text-xs">Pengguna</TableHead>
                            <TableHead className="w-[120px] text-xs text-center">Alasan Perpanjangan</TableHead>
                            <TableHead className="w-[120px] text-center text-xs">Durasi</TableHead>
                            <TableHead className="w-[120px] text-center text-xs">Status</TableHead>
                            <TableHead className="w-[120px] text-xs text-center">Tgl Pengajuan</TableHead>
                        </TableRow>
                    </TableHeader>

                    {perpanjangan.length === 0 ? (
                        <TableCaption className="mt-20">
                            {searchParams ? 'Data tidak ditemukan' : 'Belum ada peminjaman'}
                        </TableCaption>
                    ) : (
                        <TableBody>
                            {perpanjangan.map((item: any, index: number) => {
                                const {idBuku, idPengguna, idPeminjaman} = item
                                const { dataPengembalian: idPengembalian } = idPeminjaman

                                return (
                                    <TableRow onClick={() => handleNavigate(item._id)} key={index} className="border-accent-foreground/10 even:bg-accent/10 hover:bg-primary/10 ease-in-out duration-200 cursor-default" >
                                        <TableCell className="w-[50px] text-xs text-center px-0">{index + 1}</TableCell>
                                        <TableCell className="w-[200px] text-xs flex flex-row-reverse items-center justify-end gap-x-2">
                                            {item.isOpen ? null : <div className=" p-1 rounded-xl bg-primary flex items-center justify-center text-[8px]">baru</div>}
                                            {idBuku.judul.slice(0,25)}...
                                        </TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">
                                            <div className="w-full flex items-center justify-center gap-x-2">
                                                {idPengguna?.fotoProfil ? (
                                                    <img src={idPengguna?.fotoProfil} className="w-4 h-4 object-cover rounded-full" />
                                                ) : (
                                                    <div className="w-4 h-4 rounded-full flex items-center justify-center text-[12px]">{idPengguna.nama[0]}</div>
                                                )}
                                                {idPengguna.nama}
                                            </div>
                                        </TableCell>
                                        <TableCell className="w-[120px] text-center text-xs hover:text-primary duration-200 ease-in-o`ut cursor-pointer">{item.alasan.slice(0, 14)}...</TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">{item.durasi} Hari </TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">
                                            <StatusPerpanjanganBadge statusPerpanjangan={item.disetujui} />
                                        </TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">{formatedDate(item.createdAt)}</TableCell>
                                        <TableCell className="w-[50px] text-center text-xs">
                                            <TabelDropdownMenu 
                                                idPeminjaman={idPeminjaman._id} 
                                                idPengembalian={idPengembalian}
                                                idPengguna={idPengguna._id}/>
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

export default TabelSemuaPerpanjangan

const StatusPerpanjanganBadge = ({statusPerpanjangan} : {statusPerpanjangan: string}) => {
    if (statusPerpanjangan  === 'Ditolak') return <Badge variant='destructive' className="w-[80%] text-white text-center">{statusPerpanjangan}</Badge>
    if (statusPerpanjangan  === 'Pending') return <Badge variant='secondary' className="w-[80%] text-white text-center">{statusPerpanjangan}</Badge>

    return (
        <Badge className="w-[80%] text-white text-center">{statusPerpanjangan}</Badge>
    )
}