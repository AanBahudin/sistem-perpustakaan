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
import { Link, useSearchParams } from "react-router-dom"

const SpecificTabelSemuaBuku = ({dataBuku} : {dataBuku: any}) => {

    const [searchParams] = useSearchParams()

    return (
        <section className="w-full flex-1 overflow-auto scroll-custom">
            <section className="w-full min-h-[50vh] border rounded overflow-hidden">
                <Table className="w-full text-sm">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px] text-xs text-center px-0">No</TableHead>
                            <TableHead className="w-[200px] text-xs">Judul Buku</TableHead>
                            <TableHead className="w-[120px] text-center text-xs">Penulis</TableHead>
                            <TableHead className="w-[120px] text-xs text-center">Halaman</TableHead>
                            <TableHead className="w-[120px] text-center text-xs">Kategori</TableHead>
                            <TableHead className="w-[120px] text-center text-xs">Data Peminjaman</TableHead>
                            <TableHead className="w-[120px] text-xs text-center">Tahun Terbit</TableHead>
                        </TableRow>
                    </TableHeader>

                    {dataBuku.length === 0 ? (
                        <TableCaption className="mt-20">
                            {searchParams ? 'Data tidak ditemukan' : 'Belum ada peminjaman'}
                        </TableCaption>
                    ) : (
                        <TableBody>
                            {dataBuku.map((data: any, index: number) => {
                                const item = data.buku
                                const newDate = new Date(item.tahunTerbit).getFullYear()
                                return (
                                    <TableRow key={index} className="border-accent-foreground/10 hover:bg-primary/20 cursor-default duration-200 ease-in-out even:bg-accent/10 text-muted-foreground" >
                                        <TableCell className="w-[50px] text-xs text-center px-0">{index + 1}</TableCell>
                                        <TableCell className="w-[200px] text-xs">{item.judul}</TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">{item.penulis}</TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">{item.jumlahHalaman} Lembar</TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">{item.kategori[0]} </TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">
                                            <Link to={'/'} className="hover:text-primary duration-200 ease-in-out">Lihat data</Link>
                                        </TableCell>
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

export default SpecificTabelSemuaBuku