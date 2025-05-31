import BreadCrumbDetailBuku from "@/components/pengguna/DetailBukuPengguna/BreadCrumbDetailBuku"
import { Separator } from "@/components/ui/separator"
import GridLayoutButtons from "@/globals/GridLayoutButtons"
import SelectInput from "@/components/pengguna/DetailBukuPengguna/SelectInput"
import InformationContainer from "./InformationContainer"
import StatsDetailInfo from "./StatsDetailInfo"
import DetailTags from "./DetailTags"
import { Label } from "@/components/ui/label"
import DetailButton from "./DetailButton"

type DetailBookContainerDataType = {
    likedData: any,
    savedData: any,
    bookData: any,
    peminjaman: any
}

const DetailBookContainer = ({likedData, savedData, bookData, peminjaman} : DetailBookContainerDataType) => {
    
    const {data, durasi} = bookData
    const newTagline = data.tagline.slice(0,76) +"...."

    return (
        <section className="w-[80%] mx-auto">
            <BreadCrumbDetailBuku title={data.judul} />

            <main className="w-full flex my-10 gap-x-10">
                <img className="w-[400px] h-[400px] object-contain rounded-2xl border p-4" src={data.cover} alt={data.judul} />

                <div className="flex justify-start flex-col">
                    <div className="w-full flex justify-between items-center">
                        <h1 className="text-3xl font-semibold">{data.judul}</h1>
                        <GridLayoutButtons data={likedData} id={data._id} savedData={savedData} />
                    </div>

                    <h5 className="text-muted-foreground text-sm w-full trun my-2">{newTagline}</h5>

                    <StatsDetailInfo data={data} />

                    <div className="w-full flex gap-x-4">
                        <p></p>
                    </div>

                    <p className="my-4 text-muted-foreground text-sm leading-6">{data.deskripsi}</p>
                    <DetailTags kategori={data.kategori} />
                    <Separator className="w-full my-4" />
                    <InformationContainer data={data} />

                    <div className="w-full flex gap-x-20 items-start justify-start mt-8 mb-10">
                        <Label htmlFor="durasiPeminjaman" className="w-fit mt-3 text-muted-foreground">Durasi Peminjaman : </Label>
                        <div className="flex-1 self-start">
                            <SelectInput values={durasi} />
                            <DetailButton idBuku={data._id} idPeminjaman={peminjaman?._id} stok={data.stok} status={peminjaman?.statusPeminjaman || undefined} />
                        </div>
                    </div>

                </div>
            </main>

            
        </section>
    )
}

export default DetailBookContainer