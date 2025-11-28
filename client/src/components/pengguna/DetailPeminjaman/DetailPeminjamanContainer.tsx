import BreadCrumbDetailBuku from "../DetailBukuPengguna/BreadCrumbDetailBuku"
import DetailPeminjaman from "./DetailPeminjaman"

type DetailPeminjamanContainerType = {
    peminjaman: any,
    detailBuku: any,
}

const DetailPeminjamanContainer = ({ peminjaman, detailBuku } : DetailPeminjamanContainerType) => {
    return (
        <section className="w-full">
            <main className="w-[80%] mx-auto">
                <BreadCrumbDetailBuku title={detailBuku?.judul} from='Peminjaman' url='/my/data/peminjaman' />
                <DetailPeminjaman peminjaman={peminjaman} detailBuku={detailBuku} />
            </main>
        </section>
    )
}

export default DetailPeminjamanContainer