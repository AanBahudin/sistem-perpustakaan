import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Check, IdCard, LucideIcon, X } from "lucide-react"

const InformasiKontakSinglePengguna = ({dataPengguna} : {dataPengguna: any}) => {

    const { no_hp, email, verifikasiEmail, verifikasiProdi } = dataPengguna
    const IconVerifikasiEmail : LucideIcon = verifikasiEmail ? Check : X
    const IconVerifikasiProdi : LucideIcon = verifikasiProdi ? Check : X
    const emailBadgeBg = verifikasiEmail ? 'default' : 'destructive' 
    const prodiBadgeBg = verifikasiProdi ? 'default' : 'destructive' 

    return (
        <section className="w-full bg-primary/20 min-h-[25vh] rounded-xl p-4">
            <h1 className="text-sm font-light flex items-center justify-start gap-x-2">
                <IdCard />
                Informasi Kontak
            </h1>

            <h5 className="text-xs my-3">Kontak Pribadi</h5>
                        
            <main className="w-full flex items-start justify-between">
                <div className="w-full flex flex-col items-start">
                    <h5 className="text-xs text-muted-foreground">Nomor Telepon</h5>
                    <p className="min-w-fit max-w-[20%] mt-2 bg-primary/20 text-center p-1 rounded text-[10px]">{no_hp || 'Tidak disertakan'}</p>
                </div>

                <div className="w-full flex flex-col items-start">
                    <h5 className="text-xs text-muted-foreground">Email</h5>
                    <p className="min-w-fit max-w-[20%] mt-2 bg-primary/20 text-center p-1 rounded text-[10px]">{email || 'Tidak disertakan'}</p>
                </div>
            </main>

            <Separator className="my-3" />

            <h5 className="text-xs my-3">Status Verifikasi</h5>
            <main className="w-full flex items-center justify-between gap-x-6">
                <Badge variant={emailBadgeBg} className="flex-1 text-white flex items-center gap-x-2">
                    <IconVerifikasiEmail className="w-4 h-4" />
                    Email
                </Badge>
                <Badge variant={prodiBadgeBg} className="flex-1 text-white flex items-center gap-x-2">
                    <IconVerifikasiProdi className="w-4 h-4" />
                    Program Studi
                </Badge>
            </main>
        </section>
    )
}

export default InformasiKontakSinglePengguna