import { Separator } from "@/components/ui/separator"
import { CalendarCheck, CalendarSync, CalendarClock } from "lucide-react"
import { formatedDate } from "@/utils/formatDate"
import StatusPerpanjanganGrid from "./StatusPerpanjanganGrid"
import GridLayoutButtons from "@/globals/GridLayoutButtons"
import { Link } from "react-router-dom"

type PerpanjanganGridType = {
    data: any
}

const PerpanjanganGrid = ({data} : PerpanjanganGridType) => {
  return (
    <div className="w-full grid grid-cols-12 gap-4">
        {data.map((item:any) => {
            const {idBuku, disetujui, createdAt, updatedAt, durasi} = item
            let newJudul = idBuku.judul
            if (newJudul.length > 27) {
                newJudul = newJudul.slice(0,27) + '....'
            }
            return (
                <main key={item._id} className="w-full h-full col-span-6 border rounded-2xl flex items-center gap-x-4 p-4 hover:shadow-2xl duration-200 ease-in-out group">
                    <img src={idBuku.cover} className="w-28 h-32 object-fill overflow-hidden rounded" />
                    <div className="w-full flex flex-col items-start justify-between ">
                        <Link to={`/my/perpanjangan/${item._id}/${idBuku._id}`} className="text-2xl font-semibold group-hover:underline">{newJudul}</Link>
                        <Separator className="my-2 w-full" />

                        <div className="w-full flex gap-x-4 items-center justify-between">
                            <p className="flex gap-x-2 text-sm text-muted-foreground items-center">
                                <CalendarCheck className="w-5 h-5 stroke-muted-foreground" />
                                {formatedDate(createdAt)}
                            </p>
                            <p className={`flex gap-x-2 text-sm text-muted-foreground items-center`}>
                                <CalendarSync className={`w-5 h-5 ${disetujui !== 'Ditolak' ? 'stroke-muted-foreground' : 'stroke-destructive'}`} />
                                {disetujui === 'Diterima' ? formatedDate(updatedAt) : (
                                    disetujui === 'Pending' ? 'Sedang Menunggu' : "Belum dikembalikan"
                                )}
                            </p>
                        </div>

                        <p className="flex gap-x-2 text-sm text-muted-foreground items-center mt-2">
                            <CalendarClock className="w-5 h-5 stroke-muted-foreground" />
                            Permintaan perpanjangan selama {durasi} hari
                        </p>

                        <div className="w-full flex justify-center items-center gap-x-4 mt-4">
                            <StatusPerpanjanganGrid status={disetujui} />
                            <GridLayoutButtons id={idBuku._id}/>
                        </div>
                    </div>
                </main>
            )
        })}
    </div>
  )
}

export default PerpanjanganGrid