import { CalendarCheck, CalendarClock } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { formatedDate } from "@/utils/formatDate"
import { Link } from "react-router-dom"
import StatusPerpanjanganList from "../PerpanjanganPengguna.tsx/StatusPerpanjanganList"

const ListPerpanjangan = ({data} : {data: any}) => {

    if (data.length === 0) {
        return <h2 className="mt-10 text-muted-foreground text-2xl">Belum ada pengembalian</h2>
    }

    return (
        <div className="w-full grid grid-cols-12 gap-4">
            {data.map((item: any) => {
                const {idBuku, disetujui, durasi, createdAt, alasan} = item
                return (
                    <section key={item._id} className="w-full h-full col-span-6 border rounded-2xl items-center gap-x-4 p-4 hover:shadow-2xl duration-200 ease-in-out group">
                        <div className="w-full flex flex-col items-start justify-stretch ">
                            <div className="w-full flex items-center justify-between">
                                <Link to={`/my/peminjaman/${item._id}`} className="text-2xl font-semibold group-hover:underline">{formatedDate(createdAt as Date)}</Link>
                                <StatusPerpanjanganList status={disetujui} />
                            </div>

                            <Separator className="my-2 w-full" />

                            <main className=" flex items-start flex-col justify-center gap-y-2">
                                <p className="flex gap-x-4 text-sm text-muted-foreground items-center">
                                    <CalendarCheck className="w-5 h-5 stroke-muted-foreground" />
                                    {formatedDate(createdAt as Date)}
                                </p>
                                <p className="flex gap-x-4 text-sm text-muted-foreground items-center">
                                    <CalendarClock className="w-5 h-5 stroke-muted-foreground" />
                                    Peminjaman selama {durasi} hari
                                </p>
                                <p className="flex gap-x-4 text-sm  items-center">Dengan alasan, {alasan}</p>
                            </main>
                        </div>
                    </section>
                )
            })}
        </div>
    )
}

export default ListPerpanjangan