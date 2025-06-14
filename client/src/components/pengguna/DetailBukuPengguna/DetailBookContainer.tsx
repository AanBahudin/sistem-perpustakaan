import BreadCrumbDetailBuku from "./BreadCrumbDetailBuku"
import { Separator } from "@/components/ui/separator"
import GridLayoutButtons from "@/globals/GridLayoutButtons"
import InformationContainer from "./InformationContainer"
import StatsDetailInfo from "./StatsDetailInfo"
import DetailTags from "./DetailTags"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type DetailBookContainerDataType = {
    peminjaman: any,
    detailBuku: any,
}

const DetailBookContainer = ({peminjaman, detailBuku} : DetailBookContainerDataType) => {
    const {data} = detailBuku
    const newTagline = data.tagline.slice(0,76) +"...."

    return (
        <section className="w-[80%] mx-auto">
            <BreadCrumbDetailBuku title={data.judul} from="Buku" url="/my/buku" />

            <main className="w-full flex my-10 gap-x-10">
                <img className="w-[400px] h-[400px] object-contain rounded-2xl border p-4" src={data.cover} alt={data.judul} />

                <div className="flex justify-start flex-col">
                    <div className="w-full flex justify-between items-center">
                        <h1 className="text-3xl font-semibold">{data.judul}</h1>
                        <GridLayoutButtons id={data._id}/>
                    </div>

                    <h5 className="text-muted-foreground text-sm w-full trun my-2">{newTagline}</h5>

                    <StatsDetailInfo data={data} />

                    <p className="my-4 text-muted-foreground text-sm leading-6 bg-muted p-3 rounded-lg">{data.deskripsi}</p>
                    <InformationContainer data={data} />

                    <Button className="w-1/3 !text-white mt-6 flex items-center" variant='secondary'>
                        <Plus />
                        <Link className="text-[12px] capitalize" to={`/my/confirm/peminjaman/${data._id}`}>Tambahkan ke peminjaman</Link>
                    </Button>
                </div> 
            </main>

            
        </section>
    )
}

export default DetailBookContainer