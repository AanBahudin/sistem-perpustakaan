import BreadCrumbDetailBuku from '../DetailBukuPengguna/BreadCrumbDetailBuku'
import DetailPengembalian from './DetailPengembalian'

type DetailPengembalianContainerType = {
    detailPengembalian: any,
    detailBuku: any,
    dataDiri: any
}

const DetailPengembalianContainer = ({detailBuku, detailPengembalian, dataDiri} : DetailPengembalianContainerType) => {
    const {data} = detailBuku
    return (
        <section className="w-full">
            <BreadCrumbDetailBuku title={data.judul} from='Pengembalian' url='/my/data/pengembalian' />
            <DetailPengembalian data={detailPengembalian} dataDiri={dataDiri} />
        </section>
    )
}

export default DetailPengembalianContainer