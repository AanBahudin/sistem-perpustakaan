import { Badge } from "@/components/ui/badge"
import {
  Table,  
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import GlobalTooltip from "@/globals/GlobalTooltip"
import { Check, X } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"


const TableSemuaPengguna = ({dataPengguna} : {dataPengguna: any}) => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const navigationToUrl = (id: string) => {
        navigate(`/pustakawan/pengguna/detail/${id}`)
    }

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
                                    <TableRow key={index} onClick={() => navigationToUrl(item._id)} className="border-accent-foreground/10 even:bg-accent/10 hover:bg-primary/10 ease-in-out duration-200 cursor-default" >
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
                                        <TableCell className="w-[200px] text-xs">{item.email}</TableCell>
                                        <TableCell className="w-[150px] text-center text-xs">
                                            <StatusAkunBadge statusAkun={item.statusAkun} />
                                        </TableCell>
                                        <TableCell className="w-[200px] text-center text-xs">
                                            <div className="flex items-center justify-center gap-x-3">
                                                <GlobalTooltip type={`${!item.verifikasiEmail && 'danger'}`} text={`${item.verifikasiEmail ? 'Pengguna telah verifikasi Email' : 'Pengguna belum verifikasi Email'}`}>
                                                    <div className={`flex items-center gap-x-2  text-xs ${item.verifikasiEmail ? 'bg-primary/60 dark:bg-primary-foreground/60' : 'bg-destructive/30'} rounded-full text-xs py-1 px-2`}>
                                                        {item.verifikasiEmail ? (
                                                            <Check className="w-3 h-3 stroke-primary" />
                                                        ) : (
                                                            <X className="w-3 h-3 stroke-destructive" />
                                                        )}
                                                        <p className="cursor-default text-xs">Email</p>
                                                    </div>
                                                </GlobalTooltip>

                                                <GlobalTooltip  type={`${!item.verifikasiProdi && 'danger'}`} text={`${item.verifikasiProdi ? 'Pengguna telah diverifikasi Prodi' : 'Pengguna belum diverifikasi Prodi'}`}>
                                                    <div className={`flex items-center gap-x-2 ${item.verifikasiProdi ? 'bg-primary/60 dark:bg-primary-foreground/60' : 'bg-destructive/30'} rounded-full text-xs py-1 px-2`}>
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
                                )
                            })}
                        </TableBody>
                    )}
                </Table>
            </section>
        </section>
    )
}

export default TableSemuaPengguna

const StatusAkunBadge = ({statusAkun} : {statusAkun: string}) => {

    if (statusAkun === 'Nonaktif') {
        return <Badge variant='destructive' className="text-white text-center w-[80%]">{statusAkun}</Badge>
    }

    if (statusAkun === 'Pending') {
        return <Badge variant='secondary' className="text-white text-center w-[80%]">{statusAkun}</Badge>
    }

    return (
        <Badge className="text-white text-center w-[80%]">{statusAkun}</Badge>
    )
}