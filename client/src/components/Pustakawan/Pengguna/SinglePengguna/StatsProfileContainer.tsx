import { History } from "lucide-react"
import SinglePenggunaDougnut from "./SinglePenggunaDougnut"

type StatsProfileContainerType = {
  nama: string,
  ratioData: any
}

const StatsProfileContainer = ({nama, ratioData} : StatsProfileContainerType) => {
  return (
    <section className="flex-1 border rounded-2xl min-h-[40vh] p-4">
        <h1 className="text-lg font-bold flex items-center gap-x-2">
            <History className="w-3 h-3" />
            Riwayat Aktivitas {nama}
        </h1>

        <main className="w-full mt-4 flex items-center justify-center">
            <SinglePenggunaDougnut userAccountStatusRatio={ratioData} />
        </main> 
    </section>
  )
}

export default StatsProfileContainer