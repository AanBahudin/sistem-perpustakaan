import { Activity } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TabelPeminjamanSingleUser from "./TabelPeminjamanSingleUser"
import TabelPerpanjanganSingleUser from "./TabelPerpanjanganSingleUser"
import TabelPengembalianSingleUser from "./TabelPengembalianSingleUser"
import InformasiKontakSinglePengguna from "./InformasiKontakSinglePengguna"
import InformasiDosenSinglePengguna from "./InformasiDetailSinglePengguna"

type ActivityInfoContainerType = {
    pengguna: any,
    peminjaman: any,
    pengembalian: any,
    perpanjangan: any
}

const ActivityInfoContainer = ({pengguna, peminjaman, pengembalian, perpanjangan} : ActivityInfoContainerType) => {

    const tabsMenu = ['Peminjaman', 'Perpanjangan', 'Pengembalian']
    const {nama} = pengguna

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
                <InformasiKontakSinglePengguna dataPengguna={pengguna} />

                {/* STATUS KEMAHASISWAAN */}
                <InformasiDosenSinglePengguna dataPengguna={pengguna} />
            </section>
        </section>
    )
}

export default ActivityInfoContainer