import { BookMarked, CalendarCheck, CalendarClock, CalendarX, Share2, ThumbsUp } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { formatedDate } from "@/utils/formatDate"
import StatusPeminjaman from "./StatusPeminjamanGrid"
import GlobalTooltip from "@/globals/GlobalTooltip"
import ShareBookDialog from "@/globals/ShareBookDialog"
import { generateBookLink } from "@/utils/generateBookLink"

const PeminjamanGrid = ({data = ['default']} : {data: Object[]}) => {

    if (data.length === 0) {
        return <h2 className="mt-20 text-muted-foreground text-2xl">Belum ada peminjaman</h2>
    }
    return (
        <div className="w-full grid grid-cols-12 gap-4">
            {data.map((item:any) => {
                const {buku, statusPeminjaman, durasiPeminjaman, createdAt, berakhirPada} = item
                let newJudul = buku.judul
                if (newJudul.length > 27) {
                    newJudul = newJudul.slice(0,27) + '....'
                }
                return (
                    <main key={item._id} className="w-full h-full col-span-6 border rounded-2xl flex items-center gap-x-4 p-4 hover:shadow-2xl duration-200 ease-in-out">
                        <img src={buku.cover} className="w-28 h-32 object-fill overflow-hidden rounded" />
                        <div className="w-full flex flex-col items-start justify-between ">
                            <h2 className="text-2xl font-semibold">{newJudul}</h2>
                            <Separator className="my-2 w-full" />

                            <div className="w-full flex gap-x-4 items-center justify-between">
                                <p className="flex gap-x-2 text-sm text-muted-foreground items-center">
                                    <CalendarCheck className="w-5 h-5 stroke-muted-foreground" />
                                    {formatedDate(createdAt)}
                                </p>
                                <p className="flex gap-x-2 text-sm text-muted-foreground items-center">
                                    <CalendarX className={`w-5 h-5 ${statusPeminjaman === 'Diajukan' ? 'stroke-muted-foreground' : 'stroke-destructive'}`} />
                                    {berakhirPada ? formatedDate(berakhirPada) : (
                                        statusPeminjaman === 'Ditolak' ? 'Permintaan Ditolak' : "Sedang menunggu"
                                    )}
                                </p>

                            </div>
                            <p className="flex gap-x-2 text-sm text-muted-foreground items-center mt-2">
                                <CalendarClock className="w-5 h-5 stroke-muted-foreground" />
                                Peminjaman selama {durasiPeminjaman} hari
                            </p>

                            <div className="w-full flex justify-center items-center gap-x-4 mt-4">
                                <StatusPeminjaman status={statusPeminjaman} />

                                <div className="flex items-center gap-x-2">
                                    <GlobalTooltip text="Disukai">
                                        <ThumbsUp className="w-8 h-8 border p-2 rounded-lg hover:bg-muted duration-200 ease-in-out" />
                                    </GlobalTooltip>
                                    <GlobalTooltip text="Simpan">
                                        <BookMarked className="w-8 h-8 border p-2 rounded-lg hover:bg-muted duration-200 ease-in-out" />
                                    </GlobalTooltip>
                                    <GlobalTooltip text="Bagikan">
                                        <ShareBookDialog>
                                                <Share2 onClick={() => generateBookLink(buku._id)} className="w-8 h-8 border p-2 rounded-lg hover:bg-muted duration-200 ease-in-out" />
                                        </ShareBookDialog>
                                    </GlobalTooltip>
                                </div>
                            </div>
                        </div>
                    </main>
                )
            })}
        </div>
    )
}

export default PeminjamanGrid