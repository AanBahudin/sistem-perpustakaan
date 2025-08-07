import { TabsContent } from "@/components/ui/tabs"
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

const TabelPeminjamanSingleUser = ({ peminjaman }: { peminjaman: any }) => {
  return (
    <TabsContent value="Peminjaman" className="w-full flex-1 overflow-auto scroll-custom">
        <section className="w-full h-full border rounded overflow-hidden">
            <Table className="w-full text-sm">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px] text-xs text-center px-0">No</TableHead>
                    <TableHead className="w-[200px] text-xs">Judul Buku</TableHead>
                    <TableHead className="w-[120px] text-xs text-center">Kategori</TableHead>
                    <TableHead className="w-[120px] text-center text-xs">Status</TableHead>
                    <TableHead className="w-[120px] text-xs text-center">Tgl Pengajuan</TableHead>
                </TableRow>
            </TableHeader>

            {peminjaman.length === 0 ? (
                <TableCaption className="mt-20">Belum ada peminjaman</TableCaption>
            ) : (
                <TableBody>
                    {peminjaman.map((item: any, index: number) => (
                        <TableRow key={index} className="border-accent-foreground/10 even:bg-accent/10" >
                            <TableCell className="w-[50px] text-xs text-center px-0">{index + 1}</TableCell>
                            <TableCell className="w-[200px] text-xs">{item.buku.judul}</TableCell>
                            <TableCell className="w-[120px] text-center text-xs">{item.buku.kategori[0]}</TableCell>
                            <TableCell className="w-[120px] text-center text-xs">{item.statusPeminjaman}</TableCell>
                            <TableCell className="w-[120px] text-center text-xs">{formatedDate(item.createdAt)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            )}
            </Table>
        </section>
    </TabsContent>
  )
}

export default TabelPeminjamanSingleUser
