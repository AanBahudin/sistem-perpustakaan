import {
  Table,  
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import GlobalTooltip from "@/globals/GlobalTooltip"
import { Check, X } from "lucide-react"
import { useNavigate } from "react-router-dom"


const TableSemuaPengguna = ({dataPengguna} : {dataPengguna: any}) => {

    const navigate = useNavigate()
    const navigationToUrl = (id: string) => {
        navigate(`detail/${id}`)
    }

    return (
        <section className="w-full min-h-[50vh] mt-6 overflow-hidden rounded-lg border bg-accent/30">
            <Table className="w-full">
                <TableHeader>
                <TableRow className="border-muted">
                    <TableHead className="w-[250px]">Nama Pengguna</TableHead>
                    <TableHead className="w-[150px] text-center">NIM/NIDN</TableHead>
                    <TableHead className="w-[200px] text-center">Email</TableHead>
                    <TableHead className="w-[150px] text-center">Status Akun</TableHead>
                    <TableHead className="w-[200px] text-center">Verifikasi</TableHead>
                </TableRow>
                </TableHeader>

                <TableBody>
                    {dataPengguna.map((item: any, index: number) => (
                        <TableRow
                        key={index}
                        onClick={() => navigationToUrl(item._id)}
                        className="group border-muted group not-even:bg-accent-foreground/10"
                        >
                        <TableCell className="w-[250px] text-muted-foreground">
                            <div className="flex items-center gap-x-2 group-hover:underline duration-200 ease-in-out">
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
                        <TableCell className="w-[150px] text-center text-muted-foreground">{item.idKampus}</TableCell>
                        <TableCell className="w-[200px] text-muted-foreground text-sm">{item.email}</TableCell>
                        <TableCell className="w-[150px] text-center">
                            <div className={`px-4 rounded-full py-1.5 ${item.statusAkun === 'Nonaktif' || item.blocked ? 'bg-destructive/30' : (item.statusAkun === 'Pending' ? 'bg-yellow-300/40' : 'bg-primary-foreground/60')} text-xs`}>
                                <p>{item.statusAkun}</p>
                            </div>
                        </TableCell>
                        <TableCell className="w-[200px] text-center">
                            <div className="flex items-center justify-center gap-x-3">
                                <GlobalTooltip type={`${!item.verifikasiEmail && 'danger'}`} text={`${item.verifikasiEmail ? 'Pengguna telah verifikasi Email' : 'Pengguna belum verifikasi Email'}`}>
                                    <div className={`flex items-center gap-x-2 ${item.verifikasiEmail ? 'bg-primary-foreground/60' : 'bg-destructive/30'} rounded-full text-xs py-1 px-2`}>
                                        {item.verifikasiEmail ? (
                                            <Check className="w-3 h-3 stroke-primary" />
                                        ) : (
                                            <X className="w-3 h-3 stroke-destructive" />
                                        )}
                                        <p className="cursor-default">Email</p>
                                    </div>
                                </GlobalTooltip>

                                <GlobalTooltip  type={`${!item.verifikasiProdi && 'danger'}`} text={`${item.verifikasiProdi ? 'Pengguna telah diverifikasi Prodi' : 'Pengguna belum diverifikasi Prodi'}`}>
                                    <div className={`flex items-center gap-x-2 ${item.verifikasiProdi ? 'bg-primary-foreground/60' : 'bg-destructive/30'} rounded-full text-xs py-1 px-2`}>
                                        {item.verifikasiProdi ? (
                                            <Check className="w-3 h-3 stroke-primary" />
                                        ) : (
                                            <X className="w-3 h-3 stroke-destructive" />
                                        )}
                                        <p>Prodi</p>
                                    </div>
                                </GlobalTooltip>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </section>
    )
}

export default TableSemuaPengguna