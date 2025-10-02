import BreadCrumbDetailBuku from "../DetailBukuPengguna/BreadCrumbDetailBuku"
import DetailPerpanjangan from "./DetailPerpanjangan"

type DetailPerpanjanganContainerType = {
    detailBuku: any,
    detailPerpanjangan: any,
    profil: any
}

const DetailPerpanjanganContainer = ({detailBuku, detailPerpanjangan, profil} : DetailPerpanjanganContainerType) => {

    const {data} = detailBuku

    return (
        <section className="w-full">
            <BreadCrumbDetailBuku title={data.judul} from="Perpanjangan" url="/my/data/perpanjangan" />
            <DetailPerpanjangan detailBuku={data} detailPerpanjangan={detailPerpanjangan} profil={profil} />
        </section>
    )
}

export default DetailPerpanjanganContainer