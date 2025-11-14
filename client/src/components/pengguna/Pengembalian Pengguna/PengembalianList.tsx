import { CalendarCheck, CalendarClock, CalendarSync, ImageOff } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { formatedDate } from "@/utils/formatDate"
import { Link } from "react-router-dom"
import StatusPengembalianList from "./StatusPengembalianList"
import GridLayoutButtons from "@/globals/GridLayoutButtons"
import PeminjamanKategori from "../peminjaman Pengguna/PeminjamanKategori"

type PengembalianListType = {
    data: any
}

const PengembalianList = ({data} : PengembalianListType) => {

  if (data.length === 0) {
    return <h2 className="mt-20 text-muted-foreground text-2xl">Belum ada pengembalian</h2>
  }

  return (
    <div className="w-full grid grid-cols-12 gap-4">
      {data.map((item: any) => {
          const {idBuku, statusPengembalian, idPeminjaman, tanggalPengembalian, createdAt} = item
          const newDeskripsi = idBuku.deskripsi.slice(0,240) + '...'
          return (
            <section key={item._id} className="w-full h-full col-span-12 border rounded-2xl flex items-center gap-x-4 p-4 hover:shadow-2xl duration-200 ease-in-out group">
              {idBuku.cover ? (
                <img src={idBuku.cover} className="w-24 h-32 object-fill rounded" />
              ) : (
                <div className="w-24 h-32 rounded border flex items-center justify-center"> <ImageOff /> </div>
              )}

              <div className="w-full flex flex-col items-start justify-stretch ">
                <div className="w-full flex items-center justify-between">
                  <Link to={`/my/pengembalian/${item._id}/${idBuku._id}`} className="text-2xl font-semibold group-hover:underline">{idBuku.judul}</Link>
                  <div className="flex items-center gap-x-4">
                    <StatusPengembalianList status={statusPengembalian} />
                    <GridLayoutButtons id={idBuku._id}/>
                  </div>
              </div>

              <Separator className="my-2 w-full" />

                <div className="w-full flex items-center justify-between">
                  <main className="w-2/3">
                    <h5 className="text-sm text-muted-foreground">{newDeskripsi}</h5>
                    <PeminjamanKategori kategori={idBuku.kategori} />
                  </main>

                  <Separator orientation="vertical" className="mx-2" />
                    
                  <main className="self-center flex items-start flex-col justify-center w-1/3 gap-y-2 pl-10">
                    <p className="flex gap-x-4 text-sm text-muted-foreground items-center">
                          <CalendarCheck className="w-5 h-5 stroke-muted-foreground" />
                          {formatedDate(createdAt as Date)}
                    </p>
                    <p className="flex gap-x-4 text-sm text-muted-foreground items-center">
                          <CalendarSync className={`w-5 h-5 ${statusPengembalian === 'Diajukan' ? 'stroke-muted-foreground' : 'stroke-destructive'}`}  />
                          {tanggalPengembalian ? formatedDate(tanggalPengembalian) : (
                            statusPengembalian === 'Ditolak' ? 'Permintaan Ditolak' : "Sedang menunggu..."
                          )}
                    </p>
                    <p className="flex gap-x-4 text-sm text-muted-foreground items-center">
                      <CalendarClock className="w-5 h-5 stroke-muted-foreground" />
                      Peminjaman selama {idPeminjaman.durasiPeminjaman} hari
                    </p>
                  </main>
                </div>
              </div>
            </section>
          )
      })}
    </div>
  )
}

export default PengembalianList