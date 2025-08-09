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
import moment from 'moment'
import { Ellipsis } from "lucide-react"

const TabelPerpanjangan = ({perpanjangan} : {perpanjangan: any}) => {
  return (
    <TabsContent value="Perpanjangan" className="w-full flex-1 overflow-auto scroll-custom">
        <section className="w-full h-full border rounded overflow-hidden">
            <Table className="w-full text-sm">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px] text-xs text-center px-0">No</TableHead>
                        <TableHead className="w-[200px] text-xs">Judul Buku</TableHead>
                        <TableHead className="w-[120px] text-center text-xs">Pengguna</TableHead>
                        <TableHead className="w-[120px] text-xs text-center">Alasan</TableHead>
                        <TableHead className="w-[120px] text-center text-xs">Durasi</TableHead>
                        <TableHead className="w-[120px] text-xs text-center">Tgl Pengajuan</TableHead>
                    </TableRow>
                </TableHeader>

                {perpanjangan.length === 0 ? (
                    <TableCaption className="mt-20">Belum ada perpanjangan</TableCaption>
                ) : (
                    <TableBody>
                        {perpanjangan.map((item: any, index: number) => {
                            const {idPengguna: pengguna, idBuku: buku, durasi, alasan} = item
                            const newAlasan = alasan.slice(0, 20)
                            const newDate = moment(item.createdAt).subtract(10, 'days').calendar();
                            return (
                                <TableRow key={index} className="border-accent-foreground/10 even:bg-accent/10">
                                    <TableCell className="w-[50px] text-xs text-center px-0">{index + 1}</TableCell>
                                    <TableCell className="w-[200px] text-xs">{buku.judul}</TableCell>
                                    <TableCell className="w-[120px] text-center text-xs">
                                        <div className="w-full flex items-center justify-center gap-x-2">
                                            {pengguna.fotoProfil ? (
                                                <img src={pengguna.fotoProfil} className="w-4 h-4 object-cover rounded-full" />
                                            ) : (
                                                <div className="w-4 h-4 rounded-full flex items-center justify-center text-[12px]">{pengguna.nama[0]}</div>
                                            )}
                                            {pengguna.nama}
                                        </div>
                                    </TableCell>
                                    <TableCell className="w-[120px] text-center text-xs">{newAlasan}</TableCell>
                                    <TableCell className="w-[120px] text-center text-xs">{durasi} Hari</TableCell>
                                    <TableCell className="w-[120px] text-center text-xs">{newDate}</TableCell>
                                    <TableCell className="w-[50px] text-center text-xs">
                                        <div className="w-6  h-6 p-1 rounded-full hover:bg-muted duration-200 ease-in-out flex items-center justify-center">
                                            <Ellipsis className="w-3 h-3" />
                                        </div>
                                    </TableCell>
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

export default TabelPerpanjangan