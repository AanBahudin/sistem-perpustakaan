import BreadCrumbDetailBuku from "../DetailBukuPengguna/BreadCrumbDetailBuku"
import DetailPerpanjangan from "./DetailPerpanjangan"

type DetailPerpanjanganContainerType = {
    detailBuku: any,
    detailPerpanjangan: any,
    profil: any,
    peminjaman: any
}

const DetailPerpanjanganContainer = ({detailBuku, detailPerpanjangan, profil, peminjaman} : DetailPerpanjanganContainerType) => {

    return (
        <section className="w-full">
            <BreadCrumbDetailBuku title={detailBuku.judul} from="Perpanjangan" url="/my/data/perpanjangan" />
            <DetailPerpanjangan
                peminjaman={peminjaman}
                detailBuku={detailBuku} 
                detailPerpanjangan={detailPerpanjangan} 
                profil={profil} />
        </section>
    )
}

export default DetailPerpanjanganContainer