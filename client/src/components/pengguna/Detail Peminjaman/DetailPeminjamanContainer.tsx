import BreadCrumbDetailBuku from "../Detail Buku Pengguna/BreadCrumbDetailBuku"
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
            <BreadCrumbDetailBuku title={data.judul} from='Peminjaman' url='/my/data/peminjaman' />

            <DetailPeminjaman peminjaman={peminjaman} detailBuku={detailBuku} />
            <AdditionalInfoContainer perpanjangan={perpanjangan.data} pengembalian={pengembalian.data} peminjaman={peminjaman} semuaPeminjaman={semuaPeminjaman} />
        </section>
    )
}

export default DetailPeminjamanContainer