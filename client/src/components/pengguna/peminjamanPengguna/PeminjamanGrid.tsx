import { CalendarCheck, Hourglass } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const PeminjamanGrid = ({data} : {data: Object[]}) => {

    if (data.length === 0) {
        return <h2 className="mt-20 text-muted-foreground text-2xl">Belum ada peminjaman</h2>
    }
    return (
        <div className="w-full grid grid-cols-12 gap-4">
            {data.map((item:any) => {
                const {buku, statusPeminjaman, durasiPeminjaman} = item
                return (
                    <main key={item._id} className="w-full h-full col-span-6 border rounded-2xl flex gap-x-4 p-4 hover:shadow-2xl duration-200 ease-in-out">
                        <img src={buku.cover} className="w-24 object-fill rounded" />
                        <div className="w-full flex flex-col items-start justify-stretch ">
                        <h2 className="text-2xl font-semibold">{buku.judul}</h2>
                        <Separator className="my-2 w-full" />
                        <p className="flex gap-x-2 text-sm text-muted-foreground items-center">
                            <CalendarCheck className="w-5 h-5 stroke-primary" />
                            <span>10 September 2001</span>
                        </p>
                        <p className="flex gap-x-2 text-sm text-muted-foreground items-center mt-2">
                            <Hourglass className="w-5 h-5 stroke-primary" />
                            <span>Durasi peminjaman selama {durasiPeminjaman} Hari</span>
                        </p>
                        <h3 className="w-full text-center bg-primary self-center py-1 mt-4 rounded text-sm text-white">{statusPeminjaman}</h3>
                        </div>
                    </main>
                )
            })}
        </div>
    )
}

export default PeminjamanGrid