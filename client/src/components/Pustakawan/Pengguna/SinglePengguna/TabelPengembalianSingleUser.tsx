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

const TabelPengembalianSingleUser = ({pengembalian} : {pengembalian: any}) => {
  return (
    <TabsContent value="Pengembalian" className="w-full flex-1 overflow-auto scroll-custom">
        <section className="w-full h-full border rounded overflow-hidden">
            <Table className="w-full text-sm">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px] text-xs text-center px-0">No</TableHead>
                    <TableHead className="w-[200px] text-xs">Judul Buku</TableHead>
                    <TableHead className="w-[120px] text-xs text-center">Jenis</TableHead>
                    <TableHead className="w-[120px] text-center text-xs">Status</TableHead>
                    <TableHead className="w-[120px] text-xs text-center">Pengguna</TableHead>
                </TableRow>
            </TableHeader>

            {pengembalian.length === 0 ? (
                <TableCaption className="mt-20">Belum ada pengembalian</TableCaption>
            ) : (
                <TableBody>
                    {pengembalian.map((item: any, index: number) => (
                        <TableRow key={index} className="border-accent-foreground/10 even:bg-accent/10">
                            <TableCell className="w-[50px] text-xs text-center px-0">{index + 1}</TableCell>
                            <TableCell className="w-[200px] text-xs">Mastring React</TableCell>
                            <TableCell className="w-[120px] text-center text-xs">Pemrograman</TableCell>
                            <TableCell className="w-[120px] text-center text-xs">Diajukan</TableCell>
                            <TableCell className="w-[120px] text-center text-xs">Aan Bahudin</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            )}
            </Table>
        </section>
    </TabsContent>
  )
}

export default TabelPengembalianSingleUser