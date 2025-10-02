import { Separator } from "@/components/ui/separator"
import { formatedDate } from "@/utils/formatDate"
import { University } from "lucide-react"

const InformasiDetailSinglePengguna = ({dataPengguna} : {dataPengguna: any}) => {

    const { idKampus, role, jurusan, createdAt } = dataPengguna

    return (
        <main className="w-full bg-primary/20 min-h-[25vh] rounded-xl p-4">
            <h1 className="text-sm font-light flex items-center justify-start gap-x-2">
                <University className="w-5 h-5" />
                Informasi Mahasiswa
            </h1>
            
            <div className="w-full flex items-start justify-between my-3">
                <div className="w-full flex flex-col items-start">
                    <h5 className="text-xs text-muted-foreground">Status Pengguna</h5>
                    <p className="min-w-fit max-w-[20%] mt-2 bg-primary/20 text-center p-1 rounded text-[10px]">{role || 'Tidak disertakan'}</p>
                </div>

                <div className="w-full flex flex-col items-start">
                    <h5 className="text-xs text-muted-foreground ">{role === 'Dosen' ? 'NIDN' : 'Nomor Induk Mahasiswa'}</h5>
                    <p className="min-w-fit max-w-[20%] mt-2 bg-primary/20 text-center p-1 rounded text-[10px]">{idKampus || 'Tidak disertakan'}</p>
                </div>
            </div>

            <Separator className="my-3" />

            <div className="w-full flex items-start justify-between my-3">
                <div className="w-full flex flex-col items-start">
                    <h5 className="text-xs text-muted-foreground">Jurusan</h5>
                    <p className="min-w-fit max-w-[20%] mt-2 bg-primary/20 text-center p-1 rounded text-[10px]">{jurusan || 'Tidak disertakan'}</p>
                </div>

                <div className="w-full flex flex-col items-start">
                    <h5 className="text-xs text-muted-foreground">Bergabung Sejak</h5>
                    <p className="min-w-fit max-w-[20%] mt-2 bg-primary/20 text-center p-1 rounded text-[10px]">{formatedDate(createdAt) || 'Tidak disertakan'}</p>
                </div>
            </div>
        </main>
    )
}

export default InformasiDetailSinglePengguna