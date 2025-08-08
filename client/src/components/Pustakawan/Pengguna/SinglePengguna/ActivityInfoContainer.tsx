import { Activity, IdCard, University } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TabelPeminjamanSingleUser from "./TabelPeminjamanSingleUser"
import TabelPerpanjanganSingleUser from "./TabelPerpanjanganSingleUser"
import TabelPengembalianSingleUser from "./TabelPengembalianSingleUser"
import { Separator } from "@/components/ui/separator"

type ActivityInfoContainerType = {
    pengguna: any,
    peminjaman: any,
    pengembalian: any,
    perpanjangan: any
}

const ActivityInfoContainer = ({pengguna, peminjaman, pengembalian, perpanjangan} : ActivityInfoContainerType) => {

    const tabsMenu = ['Peminjaman', 'Perpanjangan', 'Pengembalian']
    const {nama, no_hp, email} = pengguna
    

    return (
        <section className="w-full h-[60vh] my-6 flex items-center justify-start gap-x-4">
            <section className="w-[70%] h-full border rounded-2xl p-4 flex flex-col items-start justify-start">
                <h1 className="text-lg font-bold flex items-center gap-x-2 w-full">
                    <Activity className="w-3 h-3" />
                    Aktivitas {nama}
                </h1>

                <Tabs defaultValue="Peminjaman" className="w-full flex-1 overflow-auto mt-4 flex flex-col">
                    <TabsList defaultValue='Peminjaman' className="bg-transparent flex gap-x-2">
                        {tabsMenu.map((item: string, index: number) => {
                            return (
                                <TabsTrigger key={index} value={item} className="text-xs">{item}</TabsTrigger>)
                            })
                        }
                    </TabsList>
                    <TabelPeminjamanSingleUser peminjaman={peminjaman} />
                    <TabelPerpanjanganSingleUser perpanjangan={perpanjangan} />
                    <TabelPengembalianSingleUser pengembalian={pengembalian} />
                </Tabs>
            </section>

            <section className="flex-1 h-full flex flex-col items-start justify-stretch gap-y-4">
                {/* PERSONAL INFORMATION STATUS */}
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

                {/* STATUS KEMAHASISWAAN */}
                <main className="w-full bg-primary/20 min-h-[25vh] rounded-xl p-4">
                    <h1 className="text-sm font-light flex items-center justify-start gap-x-2">
                        <University className="w-5 h-5" />
                        Informasi Mahasiswa
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
            </section>
        </section>
    )
}

export default ActivityInfoContainer