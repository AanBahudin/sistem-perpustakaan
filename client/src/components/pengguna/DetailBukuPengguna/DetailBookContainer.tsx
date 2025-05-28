import BreadCrumbDetailBuku from "@/components/pengguna/DetailBukuPengguna/BreadCrumbDetailBuku"
import { Separator } from "@/components/ui/separator"
import GridLayoutButtons from "@/globals/GridLayoutButtons"
import { Button } from "@/components/ui/button"
import SelectInput from "@/components/pengguna/DetailBukuPengguna/SelectInput"
import InformationContainer from "./InformationContainer"
import StatsDetailInfo from "./StatsDetailInfo"
import DetailTags from "./DetailTags"
import { Label } from "@/components/ui/label"

type DetailBookContainerDataType = {
    likedData: any,
    savedData: any,
    bookData: any
}

const DetailBookContainer = ({likedData, savedData, bookData} : DetailBookContainerDataType) => {

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
                            <div className="flex items-center mt-4 gap-x-8">
                                <Button variant='default' className="text-white text-center w-1/2">Ajukan Peminjaman</Button>
                                <p className="text-muted-foreground text-sm">tersisa {data.stok} buku</p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            
        </section>
    )
}

export default DetailBookContainer