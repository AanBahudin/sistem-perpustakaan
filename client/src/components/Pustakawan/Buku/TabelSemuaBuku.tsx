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
import { useSearchParams } from "react-router-dom"

const TabelSemuaBuku = ({dataBuku} : {dataBuku: any}) => {

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
                            <TableHead className="w-[120px] text-center text-xs">Status</TableHead>
                            <TableHead className="w-[120px] text-xs text-center">Tahun Terbit</TableHead>
                        </TableRow>
                    </TableHeader>

                    {dataBuku.length === 0 ? (
                        <TableCaption className="mt-20">
                            {searchParams ? 'Data tidak ditemukan' : 'Belum ada peminjaman'}
                        </TableCaption>
                    ) : (
                        <TableBody>
                            {dataBuku.map((item: any, index: number) => {
                                const newDate = new Date(item.tahunTerbit).getFullYear()
                                return (
                                    <TableRow key={index} className="border-accent-foreground/10 even:bg-accent/10 text-muted-foreground" >
                                        <TableCell className="w-[50px] text-xs text-center px-0">{index + 1}</TableCell>
                                        <TableCell className="w-[200px] text-xs">{item.judul}</TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">{item.penulis}</TableCell>
                                        <TableCell className="w-[120px] text-center text-xs hover:text-primary duration-200 ease-in-o`ut cursor-pointer">{item.jumlahHalaman} Lembar</TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">{item.kategori[0]} </TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">{item.status}</TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">{newDate}</TableCell>
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

export default TabelSemuaBuku