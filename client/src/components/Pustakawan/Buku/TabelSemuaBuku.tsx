import {
  Table,  
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import GlobalTooltip from "@/globals/GlobalTooltip"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import TabelDropdownMenu from "../Pengajuan/TabelDropdownMenu"

const TabelSemuaBuku = ({dataBuku} : {dataBuku: any}) => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const handleNavigate = (id: string) => {
        navigate(`/pustakawan/buku/detail/${id}`)
    }

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
                            <TableHead className="w-[120px] text-center text-xs">Stok</TableHead>
                            <TableHead className="w-[120px] text-center text-xs">Status</TableHead>
                            <TableHead className="w-[120px] text-xs text-center">Tahun Terbit</TableHead>
                        </TableRow>
                    </TableHeader>

                    {dataBuku.length === 0 ? (
                        <TableCaption className="mt-20">
                            {searchParams ? 'Data tidak ditemukan' : 'Belum ada buku'}
                        </TableCaption>
                    ) : (
                        <TableBody>
                            {dataBuku.map((item: any, index: number) => {
                                const newDate = new Date(item.tahunTerbit).getFullYear()
                                const isOutOfStock = Number(item.stok) >= 0 && Number(item.stok) <= 2
                                return (
                                    <TableRow onClick={() => handleNavigate(item._id)} key={index} className="border-accent-foreground/10 hover:bg-primary/20 cursor-default duration-200 ease-in-out even:bg-accent/10 text-muted-foreground" >
                                        <TableCell className="w-[50px] text-xs text-center px-0">{index + 1}</TableCell>
                                        <TableCell className="w-[200px] text-xs">{item.judul.slice(0,30)}</TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">{item.penulis.slice(0,20)}</TableCell>
                                        <TableCell className="w-[120px] text-center text-xs hover:text-primary duration-200 ease-in-o`ut cursor-pointer">{item.jumlahHalaman} Lembar</TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">{item.kategori[0]} </TableCell>
                                        <TableCell className={`w-[120px] text-center text-xs ${isOutOfStock && 'text-destructive'}`}>{item.stok} </TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">
                                            <StatusKetersediaBadge status={item.status} />
                                        </TableCell>
                                        <TableCell className="w-[120px] text-center text-xs">{newDate}</TableCell>
                                        <TableCell className="w-[50px] text-center text-xs">
                                            <div className="w-6  h-6 p-1 rounded-full hover:bg-muted duration-200 ease-in-out flex items-center justify-center">
                                                <GlobalTooltip text="Opsi">
                                                    <TabelDropdownMenu idBuku={item._id} />
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

const StatusKetersediaBadge = ({status} : {status: 'Tidak Tersedia' | 'Tersedia'}) => {
    return (
        <Badge variant={status === 'Tersedia' ? 'default' : 'destructive'} className={`text-center w-[80%] text-white text-xs`}>{status}</Badge>
    )
}

export default TabelSemuaBuku