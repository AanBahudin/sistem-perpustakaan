import {
  Table,  
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Ellipsis } from "lucide-react"
import GlobalTooltip from "@/globals/GlobalTooltip"
import { useSearchParams } from "react-router-dom"
import { formatedDate } from "@/utils/formatDate"
import { formatRupiah } from "@/utils/formatCurrency"

const TabelBukuHilang = ({dataBuku} : {dataBuku: any}) => {

    const [searchParams] = useSearchParams()
    const params = new URLSearchParams(searchParams).toString()

    return (
        <section className="w-full flex-1 overflow-auto scroll-custom">
            <section className="w-full min-h-[50vh] border rounded overflow-hidden">
                <Table className="w-full text-sm">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px] text-xs text-center px-0">No</TableHead>
                            <TableHead className="w-[200px] text-xs">Judul Buku</TableHead>
                            <TableHead className="w-[120px] text-xs text-center">Sisa Stok Buku</TableHead>
                            <TableHead className="w-[120px] text-center text-xs">Pengguna</TableHead>
                            <TableHead className="w-[120px] text-center text-xs">Total Denda</TableHead>
                            <TableHead className="w-[120px] text-center text-xs">Status Pembayaran</TableHead>
                            <TableHead className="w-[120px] text-xs text-center">Tanggal Pengembalian</TableHead>
                        </TableRow>
                    </TableHeader>

                    {dataBuku.length === 0 ? (
                        <TableCaption className="mt-20">
                            {params ? 'Data tidak ditemukan' : 'Belum ada buku hilang'}
                        </TableCaption>
                    ) : (
                        <TableBody>
                            {dataBuku.map((data: any, index: number) => {
                                const item = data.idBuku
                                const newDate = formatedDate(data.tanggalPengembalian)
                                const { idPengguna } = data
                                return (
                                    <TableRow key={index} className="border-accent-foreground/10 hover:bg-primary/20 cursor-default duration-200 ease-in-out even:bg-accent/10 text-muted-foreground" >
                                        <TableCell className="w-[50px] text-xs text-center px-0">{index + 1}</TableCell>
                                        <TableCell className="w-[200px] text-xs">{item.judul}</TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">{item.stok}</TableCell>
                                        <TableCell className="w-full flex items-center justify-center gap-x-2 text-xs">
                                            {idPengguna?.fotoProfil ? (
                                                <img src={idPengguna.fotoProfil} className="w-4 h-4 object-cover rounded-full" />
                                            ) : (
                                                <div className="w-4 h-4 rounded-full flex items-center justify-center text-[12px]">{idPengguna.nama[0]}</div>
                                            )}
                                            {idPengguna.nama}
                                        </TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">{formatRupiah(data.totalDenda)}</TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">{data.statusPembayaran}</TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">{newDate}</TableCell>
                                        <TableCell className="w-[50px] text-center text-xs">
                                            <div className="w-6  h-6 p-1 rounded-full hover:bg-muted duration-200 ease-in-out flex items-center justify-center">
                                                <GlobalTooltip text="Opsi">
                                                    <Ellipsis className="w-3 h-3" />
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

export default TabelBukuHilang