import { Separator } from "@/components/ui/separator"
import { CalendarCheck, CalendarClock, CalendarSync } from "lucide-react"
import { formatedDate } from "@/utils/formatDate"
import StatusPengembalianGrid from "./StatusPengembalianGrid"
import GridLayoutButtons from "@/globals/GridLayoutButtons"

type PeminjamanGridType = {
    data: any,
    likedData: any,
    savedData: any
}

const PengembalianGrid = ({data=['default'], likedData, savedData} : PeminjamanGridType) => {
  if (data.length === 0) {
    return <h2 className="mt-20 text-muted-foreground text-2xl">Belum ada pengembalian</h2>
  }

  return (
     <div className="w-full grid grid-cols-12 gap-4">
        {data.map((item:any) => {
            const {idBuku, idPeminjaman, statusPengembalian, createdAt, tanggalPengembalian} = item
            // console.log(newJudul)
            let newJudul = idBuku.judul
            if (newJudul?.length > 27) {
                newJudul = newJudul.slice(0,27) + '....'
            }
            return (
                <main key={item._id} className="w-full h-full col-span-6 border rounded-2xl flex items-center gap-x-4 p-4 hover:shadow-2xl duration-200 ease-in-out">
                    <img src={idBuku.cover} className="w-28 h-32 object-fill overflow-hidden rounded" />
                    <div className="w-full flex flex-col items-start justify-between ">
                        <h2 className="text-2xl font-semibold">{newJudul}</h2>
                        <Separator className="my-2 w-full" />

                        <div className="w-full flex gap-x-4 items-center justify-between">
                            <p className="flex gap-x-2 text-sm text-muted-foreground items-center">
                                <CalendarCheck className="w-5 h-5 stroke-muted-foreground" />
                                {formatedDate(createdAt)}
                            </p>
                            <p className="flex gap-x-2 text-sm text-muted-foreground items-center">
                                <CalendarSync className={`w-5 h-5 ${statusPengembalian === 'Diajukan' ? 'stroke-muted-foreground' : 'stroke-destructive'}`} />
                                {tanggalPengembalian ? formatedDate(tanggalPengembalian) : (
                                    statusPengembalian === 'Pending' ? 'Sedang Menunggu' : "Belum dikembalikan"
                                )}
                            </p>
                        </div>

                        <p className="flex gap-x-2 text-sm text-muted-foreground items-center mt-2">
                            <CalendarClock className="w-5 h-5 stroke-muted-foreground" />
                            Peminjaman selama {idPeminjaman.durasiPeminjaman} hari
                        </p>

                        <div className="w-full flex justify-center items-center gap-x-4 mt-4">
                            <StatusPengembalianGrid status={statusPengembalian} />
                            <GridLayoutButtons id={idBuku._id} data={likedData} savedData={savedData} />
                        </div>
                    </div>
                </main>
            )
        })}
    </div>
  )
}

export default PengembalianGrid