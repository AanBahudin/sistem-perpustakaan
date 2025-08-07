import { TabsContent } from "@/components/ui/tabs"
import {
  Table,  
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const TabelPerpanjanganSingleUser = () => {
  return (
    <TabsContent value="Perpanjangan" className="w-full h-full">
        <main className="w-full h-fit border rounded">
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
            </Table>

            </main>

            <div className="w-full h-full overflow-y-scroll scroll-custom flex-1 mt-2">
                <Table className="w-full">
                    <TableBody>
                        {Array.from({length: 100}).map((_, index: number) => {
                            return (
                                <TableRow key={index} className="border-accent-foreground/10 not-even:bg-accent-foreground/10">
                                    <TableCell className="w-[50px] text-xs text-center px-0">{index + 1}</TableCell>
                                    <TableCell className="w-[200px] text-xs">Mastering React</TableCell>
                                    <TableCell className="w-[120px] text-center text-xs">Pemrograman</TableCell>
                                    <TableCell className="w-[120px] text-center text-xs">DIajukan</TableCell>
                                    <TableCell className="w-[120px] text-center text-xs">Aan Bahudin</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
    </TabsContent>
  )
}

export default TabelPerpanjanganSingleUser