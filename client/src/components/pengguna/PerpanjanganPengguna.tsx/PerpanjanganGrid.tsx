import { Separator } from "@/components/ui/separator"
import { CalendarCheck, Hourglass } from "lucide-react"
import { formatedDate } from "@/utils/formatDate"
import StatusPerpanjanganGrid from "./StatusPerpanjanganGrid"

const PerpanjanganGrid = ({data} : {data: any}) => {
  return (
    <div className="w-full grid grid-cols-12 gap-4">
        {data.map((item:any) => {
            const {idBuku, disetujui, createdAt} = item
            return (
                <main key={item._id} className="w-full h-full col-span-6 border rounded-2xl flex gap-x-4 p-4 hover:shadow-2xl duration-200 ease-in-out">
                    <img src={idBuku.cover} className="w-24 object-fill rounded" />
                    <div className="w-full flex flex-col items-start justify-between ">
                        <h2 className="text-2xl font-semibold">{idBuku.judul}</h2>
                        <Separator className="my-2 w-full" />
                        <p className="flex gap-x-2 text-sm text-muted-foreground items-center">
                            <CalendarCheck className="w-5 h-5 stroke-primary" />
                            {formatedDate(createdAt)}
                        </p>
                        <p className="flex gap-x-2 text-sm text-muted-foreground items-center mt-2">
                            <Hourglass className="w-5 h-5 stroke-primary" />
                            <span className="capitalize">Kondisi buku {item.keadaanBuku}</span>
                        </p>
                        <StatusPerpanjanganGrid status={disetujui} />
                    </div>
                </main>
            )
        })}
    </div>
  )
}

export default PerpanjanganGrid