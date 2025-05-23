import { CalendarCheck, CalendarX, CalendarClock, ThumbsUp, BookMarked, Share2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { formatedDate } from "@/utils/formatDate"
import { Link } from "react-router-dom"
import StatusPeminjamanList from "./StatusPeminjamanList"
import GlobalTooltip from "@/globals/GlobalTooltip"


const PeminjamanList = ({data = []} : {data: Object[]}) => {
  if (data.length === 0) {
    return <h2 className="mt-20 text-muted-foreground text-2xl">Belum ada peminjaman</h2>
  }

  return (
    <div className="w-full grid grid-cols-12 gap-4">
      {data.map((item: any) => {
          const {buku, statusPeminjaman, durasiPeminjaman, berakhirPada, createdAt} = item
          const newDeskripsi = buku.deskripsi.slice(0,240) + '...'

          let newKategori : Array<string> = buku.kategori
          if (newKategori.length > 3) {
            newKategori = newKategori.slice(0, 3)
          }
          return (
            <Link to={`/my/peminjaman/${item._id}`} key={item._id} className="w-full h-full col-span-12 border rounded-2xl flex items-center gap-x-4 p-4 hover:shadow-2xl duration-200 ease-in-out group">
              <img src={buku.cover} className="w-24 h-32 object-fill rounded" />

              <div className="w-full flex flex-col items-start justify-stretch ">
              <div className="w-full flex items-center justify-between">
                <h2 className="text-2xl font-semibold group-hover:underline">{buku.judul}</h2>
                <div className="flex items-center gap-x-4">
                  <StatusPeminjamanList status={statusPeminjaman} />
                  <div className="flex items-center gap-x-2">
                      <GlobalTooltip text="Disukai">
                          <ThumbsUp className="w-8 h-8 border p-2 rounded-lg hover:bg-muted duration-200 ease-in-out" />
                      </GlobalTooltip>
                      <GlobalTooltip text="Simpan">
                          <BookMarked className="w-8 h-8 border p-2 rounded-lg hover:bg-muted duration-200 ease-in-out" />
                      </GlobalTooltip>
                      <GlobalTooltip text="Bagikan">
                          <Share2 className="w-8 h-8 border p-2 rounded-lg hover:bg-muted duration-200 ease-in-out" />
                      </GlobalTooltip>
                  </div>
                </div>
              </div>
              <Separator className="my-2 w-full" />

              <div className="w-full flex items-center justify-between">
                <main className="w-2/3">
                  <h5 className="text-sm text-muted-foreground">{newDeskripsi}</h5>

                  <div className="w-full flex gap-x-2 items-center">
                    {newKategori.map((item: string) => {
                      return (
                        <h5 className="mt-2 bg-muted w-fit px-6 border rounded py-1 text-[12px]">{item}</h5>
                      )
                    })}
                  </div>

                </main>
                <Separator orientation="vertical" className="mx-2" />
                <main className="self-center flex items-start flex-col justify-center w-1/3 gap-y-2">
                  <p className="flex gap-x-4 text-sm text-muted-foreground items-center">
                        <CalendarCheck className="w-5 h-5 stroke-muted-foreground" />
                        {formatedDate(createdAt as Date)}
                  </p>
                  <p className="flex gap-x-4 text-sm text-muted-foreground items-center">
                        <CalendarX className={`w-5 h-5 ${statusPeminjaman === 'Diajukan' ? 'stroke-muted-foreground' : 'stroke-destructive'}`}  />
                        {berakhirPada ? formatedDate(berakhirPada) : (
                          statusPeminjaman === 'Ditolak' ? 'Permintaan Ditolak' : "Sedang menunggu..."
                        )}
                  </p>
                  <p className="flex gap-x-4 text-sm text-muted-foreground items-center">
                    <CalendarClock className="w-5 h-5 stroke-muted-foreground" />
                    Peminjaman selama {durasiPeminjaman} hari
                  </p>
                </main>
              </div>
              </div>
            </Link>
          )
      })}
    </div>
  )
}

export default PeminjamanList