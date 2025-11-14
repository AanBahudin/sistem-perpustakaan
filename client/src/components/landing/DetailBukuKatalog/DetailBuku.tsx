import BreadCrumbDetailBuku from "@/components/pengguna/DetailBukuPengguna/BreadCrumbDetailBuku"
import StatsDetailInfo from "@/components/pengguna/DetailBukuPengguna/StatsDetailInfo"
import InformationContainer from "@/components/pengguna/DetailBukuPengguna/InformationContainer"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Lock, ImageOff } from "lucide-react"


const DetailBuku = ({data} : {data: any}) => {
  const newTagline = data.tagline.slice(0,76) +"...."
  return (
    <section className="w-[80%] mx-auto">
      <BreadCrumbDetailBuku title={data.judul} from="Katalog" url="/katalog" />

      <main className="w-full flex my-10 gap-x-10">
        {data.cover ? (
            <img className="w-[400px] h-[400px] object-contain rounded-2xl border p-4" src={data.cover} alt={data.judul} />
        ) : (
            <div className="w-[700px] h-[400px] rounded-2xl border flex items-center justify-center"> <ImageOff className="w-14" /> </div>
        )}

        <div className="flex justify-start flex-col">
          <h1 className="text-2xl font-semibold">{data.judul}</h1>

          <h5 className="text-muted-foreground text-sm w-full trun my-2">{newTagline}</h5>

          <StatsDetailInfo data={data} />

          <p className="my-4 text-muted-foreground text-sm leading-6 bg-muted p-3 rounded-lg">{data.deskripsi}</p>
          <InformationContainer data={data} />

          <Link to='/login' className='w-full'>
            <Button className='w-full my-10 text-xs flex items-center justify-center gap-x-4'>
              <Lock />
              Masuk untuk melakukan peminjaman
            </Button>
          </Link>
        </div> 
      </main>

    </section>
  )
}

export default DetailBuku