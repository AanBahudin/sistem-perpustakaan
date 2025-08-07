import { Activity } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ActivityInfoContainer = ({nama} : {nama: string}) => {

    const tabsMenu = ['Peminjaman', 'Perpanjangan', 'Pengembalian']

    return (
        <section className="w-full">
            <section className="w-[70%] min-h-[35vh] border rounded-2xl p-4">
            <h1 className="text-lg font-bold flex items-center gap-x-2">
                <Activity className="w-3 h-3" />
                Aktivitas {nama}
            </h1>

            <Tabs defaultValue="account" className="w-[400px] mt-4">
                <TabsList className="bg-transparent flex gap-x-2">
                    {tabsMenu.map((item: string, index: number) => {
                        return (
                            <TabsTrigger key={index} value={item} className="text-xs">{item}</TabsTrigger>)
                        })
                    }
                </TabsList>
                <TabsContent value="Peminjaman">Make changes to your account here.</TabsContent>
                <TabsContent value="Perpanjangan">Change your password here.</TabsContent>
                <TabsContent value="Pengembalian">Change your password here.</TabsContent>
            </Tabs>
            </section>
        </section>
    )
}

export default ActivityInfoContainer