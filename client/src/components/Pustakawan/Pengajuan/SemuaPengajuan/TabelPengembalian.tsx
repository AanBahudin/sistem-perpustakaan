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
import moment from "moment"
import { Ellipsis } from "lucide-react"
import { useNavigate } from "react-router-dom"

const TabelPengembalian = ({pengembalian} : {pengembalian: any}) => {

  const navigate = useNavigate()
  const handleNavigate = (id: string) => {
    navigate(`/pustakawan/pengajuan/pengembalian/${id}`)
  }

  return (
    <TabsContent value="Pengembalian" className="w-full flex-1 overflow-auto scroll-custom">
        <section className="w-full h-full border rounded overflow-hidden">
            <Table className="w-full text-sm">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px] text-xs text-center px-0">No</TableHead>
                    <TableHead className="w-[200px] text-xs">Judul Buku</TableHead>
                    <TableHead className="w-[120px] text-xs text-center">Pengguna</TableHead>
                    <TableHead className="w-[120px] text-center text-xs">Keadaan Buku</TableHead>
                    <TableHead className="w-[120px] text-xs text-center">Status</TableHead>
                    <TableHead className="w-[120px] text-xs text-center">Tgl Pengajuan</TableHead>
                </TableRow>
            </TableHeader>

            {pengembalian.length === 0 ? (
                <TableCaption className="mt-20">Belum ada pengembalian</TableCaption>
            ) : (
                <TableBody>
                    {pengembalian.map((item: any, index: number) => {
                      const {idBuku: buku, idPengguna: pengguna, statusPengembalian: status} = item
                      const newDate = moment(item.createdAt).subtract(10, 'days').calendar();

                      return (
                        <TableRow onClick={() => handleNavigate(item._id)} key={index} className="border-accent-foreground/10 even:bg-accent/10 hover:bg-primary/10 ease-in-out duration-200 cursor-default">
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
                          <TableCell className="w-[120px] text-center text-xs">{item.keadaanBuku}</TableCell>
                          <TableCell className="w-[120px] text-center text-xs">{status}</TableCell> 
                          <TableCell className="w-[120px] text-center text-xs">{newDate}</TableCell>
                          <TableCell className="w-[50px] text-center text-xs">
                            <div className="w-6  h-6 p-1 rounded-full hover:bg-muted duration-200 ease-in-out flex items-center justify-center">
                                <Ellipsis className="w-3 h-3" />
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    }
                    )}
                </TableBody>
            )}
            </Table>
        </section>
    </TabsContent>
  )
}

export default TabelPengembalian