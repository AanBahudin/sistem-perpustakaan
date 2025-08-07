import { Activity } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TabelPeminjamanSingleUser from "./TabelPeminjamanSingleUser"
import TabelPerpanjanganSingleUser from "./TabelPerpanjanganSingleUser"
import TabelPengembalianSingleUser from "./TabelPengembalianSingleUser"

type ActivityInfoContainerType = {
    nama: string,
    peminjaman: any,
    pengembalian: any,
    perpanjangan: any
}

const ActivityInfoContainer = ({nama, peminjaman, pengembalian, perpanjangan} : ActivityInfoContainerType) => {

    const tabsMenu = ['Peminjaman', 'Perpanjangan', 'Pengembalian']

    return (
        <section className="w-full h-[45vh]">
            <section className="w-[70%] h-full border rounded-2xl p-4 flex flex-col items-start justify-start">
                <h1 className="text-lg font-bold flex items-center gap-x-2 w-full">
                    <Activity className="w-3 h-3" />
                    Aktivitas {nama}
                </h1>

                <Tabs defaultValue="Peminjaman" className="w-full flex-1 overflow-auto mt-4  flex flex-col">
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
        </section>
    )
}

export default ActivityInfoContainer