import { Activity } from "lucide-react"
import SinglePenggunaDougnut from "./SinglePenggunaDougnut"

const StatsProfileContainer = ({nama} : {nama: string}) => {
  return (
    <section className="flex-1 border rounded-2xl min-h-[40vh] p-4">
        <h1 className="text-lg font-bold flex items-center gap-x-2">
            <Activity className="w-3 h-3" />
            Riwayat Aktivitas {nama}
        </h1>

        <main className="w-full mt-4 flex items-center justify-center">
            <SinglePenggunaDougnut userAccountStatusRatio={[13, 15, 13]} />
        </main> 
    </section>
  )
}

export default StatsProfileContainer