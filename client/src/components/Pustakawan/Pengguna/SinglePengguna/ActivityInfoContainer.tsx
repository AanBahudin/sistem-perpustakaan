import { Activity } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TabelPeminjamanSingleUser from "./TabelPeminjamanSingleUser"
import TabelPerpanjanganSingleUser from "./TabelPerpanjanganSingleUser"
import TabelPengembalianSingleUser from "./TabelPengembalianSingleUser"

const ActivityInfoContainer = ({nama} : {nama: string}) => {

    const tabsMenu = ['Peminjaman', 'Perpanjangan', 'Pengembalian']

    return (
        <section className="w-full">
            <section className="w-[70%] h-[45vh] border rounded-2xl p-4 flex flex-col items-start justify-start">
                <h1 className="text-lg font-bold flex items-center gap-x-2">
                    <Activity className="w-3 h-3" />
                    Aktivitas {nama}
                </h1>

            <Tabs className="w-full h-full overflow-y-hidden scroll-auto mt-4">
                <TabsList defaultValue='Peminjaman' className="bg-transparent flex gap-x-2">
                    {tabsMenu.map((item: string, index: number) => {
                        return (
                            <TabsTrigger key={index} value={item} className="text-xs">{item}</TabsTrigger>)
                        })
                    }
                </TabsList>
                <TabelPeminjamanSingleUser />
                <TabelPerpanjanganSingleUser />
                <TabelPengembalianSingleUser />
            </Tabs>
            </section>
        </section>
    )
}

export default ActivityInfoContainer