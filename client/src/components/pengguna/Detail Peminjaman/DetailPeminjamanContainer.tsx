import BreadCrumbDetailBuku from "../DetailBukuPengguna/BreadCrumbDetailBuku"
import DetailPeminjaman from "./DetailPeminjaman"

type DetailPeminjamanContainerType = {
    peminjaman: any,
    perpanjangan: any,
    pengembalian: any,
    detailBuku: any,
    semuaPeminjaman: any
}

const DetailPeminjamanContainer = ({ peminjaman, detailBuku } : DetailPeminjamanContainerType) => {
    const {data} = detailBuku
    return (
        <section className="w-full">
            <main className="w-[80%] mx-auto">
                <BreadCrumbDetailBuku title={data.judul} from='Peminjaman' url='/my/data/peminjaman' />
                <DetailPeminjaman peminjaman={peminjaman} detailBuku={detailBuku} />
            </main>
        </section>
    )
}

export default DetailPeminjamanContainer