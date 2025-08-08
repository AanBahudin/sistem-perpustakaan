import { Separator } from "@/components/ui/separator"
import { IdCard } from "lucide-react"

const InformasiKontakSinglePengguna = ({dataPengguna} : {dataPengguna: any}) => {

    const { no_hp, email } = dataPengguna

    return (
        <main className="w-full bg-primary/20 min-h-[25vh] rounded-xl p-4">
            <h1 className="text-sm font-light flex items-center justify-start gap-x-2">
                <IdCard />
                Informasi Kontak
            </h1>

            <h5 className="text-xs my-3">Kontak Pribadi</h5>
                        
            <div className="w-full flex items-start justify-between">
                <div className="w-full flex flex-col items-start">
                    <h5 className="text-xs text-muted-foreground">Nomor Telepon</h5>
                    <p className="min-w-fit max-w-[20%] mt-2 bg-primary/20 text-center p-1 rounded text-[10px]">{no_hp || 'Tidak disertakan'}</p>
                </div>

                <div className="w-full flex flex-col items-start">
                    <h5 className="text-xs text-muted-foreground">Email</h5>
                    <p className="min-w-fit max-w-[20%] mt-2 bg-primary/20 text-center p-1 rounded text-[10px]">{email || 'Tidak disertakan'}</p>
                </div>
            </div>

            <Separator className="my-3" />

            <h5 className="text-xs my-3">Kontak Pribadi</h5>
            <h5 className="text-xs italic text-muted-foreground">Tidak ada</h5>
        </main>
    )
}

export default InformasiKontakSinglePengguna