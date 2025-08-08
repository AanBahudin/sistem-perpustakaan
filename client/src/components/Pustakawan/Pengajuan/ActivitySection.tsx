import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TabelPeminjaman from "@/components/Pustakawan/Pengajuan/TabelPeminjaman"
import TabelPerpanjangan from "@/components/Pustakawan/Pengajuan/TabelPerpanjangan"
import TabelPengembalian from "@/components/Pustakawan/Pengajuan/TabelPengembalian"
import { Activity } from "lucide-react"

type ActivitySectionType = {
    peminjaman: any,
    perpanjangan: any,
    pengembalian: any
}

const ActivitySection = ({peminjaman, perpanjangan, pengembalian} : ActivitySectionType) => {

    const tabsMenu = ['Peminjaman', 'Perpanjangan', 'Pengembalian']

    return (
        <section className="w-full h-[60vh] my-6 flex items-center justify-start gap-x-4">
            <section className="w-full h-full border rounded-2xl p-4 flex flex-col items-start justify-start">
                <h1 className="text-lg font-bold flex items-center gap-x-2 w-full">
                    <Activity className="w-3 h-3" />
                    Aktivitas Semua Pengajuan Pengguna
                </h1>

                <Tabs defaultValue="Peminjaman" className="w-full flex-1 overflow-auto mt-4 flex flex-col">
                    <TabsList defaultValue='Peminjaman' className="bg-transparent flex gap-x-2">
                        {tabsMenu.map((item: string, index: number) => {
                            return (
                                <TabsTrigger key={index} value={item} className="text-xs">{item}</TabsTrigger>)
                            })
                        }
                    </TabsList>
                    <TabelPeminjaman peminjaman={peminjaman} />
                    <TabelPerpanjangan perpanjangan={perpanjangan} />
                    <TabelPengembalian pengembalian={pengembalian} />
                </Tabs>
            </section>
        </section>
    )
}

export default ActivitySection