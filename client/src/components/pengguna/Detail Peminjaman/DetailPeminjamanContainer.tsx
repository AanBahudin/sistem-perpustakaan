import BreadCrumbDetailBuku from "../DetailBukuPengguna/BreadCrumbDetailBuku"
import AdditionalInfoContainer from "./AdditionalInfoContainer"
import DetailPeminjaman from "./DetailPeminjaman"

type DetailPeminjamanContainerType = {
    peminjaman: any,
    perpanjangan: any,
    pengembalian: any,
    detailBuku: any,
    semuaPeminjaman: any
}

const DetailPeminjamanContainer = ({semuaPeminjaman, peminjaman, perpanjangan, pengembalian, detailBuku} : DetailPeminjamanContainerType) => {
    const {data} = detailBuku
    return (
        <section className="w-full">
            <main className="w-[80%] mx-auto">
                <BreadCrumbDetailBuku title={data.judul} from='Peminjaman' url='/my/data/peminjaman' />
                <DetailPeminjaman peminjaman={peminjaman} detailBuku={detailBuku} />
            </main>
            <AdditionalInfoContainer perpanjangan={perpanjangan.data} pengembalian={pengembalian.data} peminjaman={peminjaman} semuaPeminjaman={semuaPeminjaman} />
        </section>
    )
}

export default DetailPeminjamanContainer