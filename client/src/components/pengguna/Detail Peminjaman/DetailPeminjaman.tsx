import DetailButton from "../DetailBukuPengguna/DetailButton"
import GridLayoutButtons from "@/globals/GridLayoutButtons"
import StatsDetailInfo from "../DetailBukuPengguna/StatsDetailInfo"
import DetailPeminjamanInfo from "./DetailPeminjamanInfo"

type DetailPeminjamanType = {
    peminjaman: any,
    detailBuku: any
}

const DetailPeminjaman = ({peminjaman, detailBuku} : DetailPeminjamanType) => {

    const {data} = detailBuku

    const {cover, judul, _id, deskripsi, stok, tagline} = data

    return (
        <main className="w-full flex my-10 gap-x-10 mt-10">
            <img className="w-[400px] h-[400px] object-contain rounded-2xl border p-4" src={cover} alt={judul} />

            <div className="flex justify-start flex-col">
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-3xl font-semibold">{judul}</h1>
                    <GridLayoutButtons id={_id}/>
                </div>

                <h5 className="text-muted-foreground text-sm w-full trun my-2">{tagline}</h5>

                <StatsDetailInfo data={data} />
                <p className="my-4 text-muted-foreground text-sm leading-6">{deskripsi}</p>

                <DetailPeminjamanInfo peminjaman={peminjaman} />
                <DetailButton idBuku={_id} idPeminjaman={peminjaman?._id} stok={stok} status={peminjaman?.statusPeminjaman || undefined} />
            </div>
        </main>
    )
}

export default DetailPeminjaman