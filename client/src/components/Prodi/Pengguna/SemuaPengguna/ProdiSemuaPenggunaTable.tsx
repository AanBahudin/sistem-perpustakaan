import {
  Table,  
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSearchParams } from "react-router-dom"
import { StatusAkunBadge, VerifikasiBadge } from "@/components/Pustakawan/Pengguna/SemuaPengguna/TableSemuaPengguna"
import ProdiPenggunaDropdownTable from "../ProdiPenggunaDropdownTable"

const ProdiSemuaPenggunaTable = ({dataPengguna} : {dataPengguna: any}) => {

    const [searchParams] = useSearchParams()

    return (
        <section className="w-full flex-1 overflow-auto scroll-custom">
            <section className="w-full min-h-[50vh] border rounded overflow-hidden">
                <Table className="w-full text-sm">
                    <TableHeader>
                        <TableRow className="border-muted">
                            <TableHead className="w-[50px] text-xs text-center px-0">No</TableHead>
                            <TableHead className="w-[200px] text-xs">Nama Pengguna</TableHead>
                            <TableHead className="w-[120px] text-center text-xs">NIM/NIDN</TableHead>
                            <TableHead className="w-[120px] text-xs text-center">Email</TableHead>
                            <TableHead className="w-[120px] text-xs text-center">Role</TableHead>
                            <TableHead className="w-[120px] text-center text-xs">Status Akun</TableHead>
                            <TableHead className="w-[120px] text-center text-xs">Verifikasi</TableHead>
                        </TableRow>
                    </TableHeader>

                    {dataPengguna.length === 0 ? (
                        <TableCaption className="mt-20">
                            {searchParams ? 'Data tidak ditemukan' : 'Belum ada pengguna'}
                        </TableCaption>
                    ) : (
                        <TableBody>
                            {dataPengguna.map((item: any, index: number) => {
                                return (
                                    <TableRow key={index} className="border-accent-foreground/10 text-muted-foreground even:bg-accent/10 hover:bg-primary/10 ease-in-out duration-200 cursor-default" >
                                        <TableCell className="w-[50px] text-xs text-center px-0">{index + 1 }</TableCell>
                                        <TableCell className="w-[250px] text-xs">
                                            <div className="flex items-center gap-x-2 group-hover:underline cursor-default duration-200 ease-in-out">
                                                {item.fotoProfil ? (
                                                    <img
                                                    src={item.fotoProfil}
                                                    alt={`Foto ${item.nama}`}
                                                    className="w-5 h-5 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full bg-accent/80 flex items-center justify-center text-muted-foreground text-xs uppercase">
                                                        {item.nama[0]}
                                                    </div>
                                                )}
                                                {item.nama}
                                            </div>
                                        </TableCell>
                                        <TableCell className="w-[150px] text-center text-xs">{item.idKampus}</TableCell>
                                        <TableCell className="w-[200px] text-xs text-center">{item.email}</TableCell>
                                        <TableCell className="w-[200px] text-xs text-center">{item.role}</TableCell>
                                        <TableCell className="w-[150px] text-center text-xs">
                                            <StatusAkunBadge statusAkun={item.statusAkun} />
                                        </TableCell>
                                        <TableCell className="w-[200px] text-center text-xs">
                                            <VerifikasiBadge emailVerify={item.verifikasiEmail} prodiVerify={item.verifikasiProdi} />
                                        </TableCell>
                                        <TableCell className="w-[80px] flex-1 flex items-center justify-center">
                                            <ProdiPenggunaDropdownTable dataPengguna={item} />
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

export default ProdiSemuaPenggunaTable