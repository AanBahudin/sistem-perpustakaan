import { TabsContent } from "@/components/ui/tabs"
import {
  Table,  
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const TabelPerpanjanganSingleUser = ({perpanjangan} : {perpanjangan: any}) => {
  return (
    <TabsContent value="Perpanjangan" className="w-full flex-1 overflow-auto scroll-custom">
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

            {perpanjangan.length === 0 ? (
                <TableCaption className="mt-20">Belum ada perpanjangan</TableCaption>
            ) : (
                <TableBody>
                    {perpanjangan.map((item: any, index: number) => {
                        const {idPengguna: pengguna, idBuku: buku, disetujui} = item
                        const statusPerpanjanganBg = disetujui === 'Pending' ? 'bg-yellow-300' : (disetujui === 'Diterima' ? 'bg-primary' : 'bg-destructive')
                        return (
                            <TableRow key={index} className="border-accent-foreground/10 even:bg-accent/10">
                                <TableCell className="w-[50px] text-xs text-center px-0">{index + 1}</TableCell>
                                <TableCell className="w-[200px] text-xs">{buku.judul}</TableCell>
                                <TableCell className="w-[120px] text-center text-xs">{buku.kategori[0]}</TableCell>
                                <TableCell className="w-[120px] text-center text-xs">{buku.disetujui}</TableCell>
                                <TableCell className="w-[120px] text-center text-xs">
                                    <p className={`${statusPerpanjanganBg} w-[80px] text-center mx-auto px-3 py-1 rounded`}>{disetujui}</p>
                                </TableCell>
                                <TableCell className="w-[120px] text-center text-xs">{pengguna.nama}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            )}
            </Table>
        </section>
    </TabsContent>
  )
}

export default TabelPerpanjanganSingleUser