import BreadCrumbDetailBuku from '../Detail Buku Pengguna/BreadCrumbDetailBuku'
import DetailPengembalian from './DetailPengembalian'

type DetailPengembalianContainerType = {
    detailPengembalian: any,
    detailBuku: any,
    dataDiri: any,
    detailPinjaman: any
}

const DetailPengembalianContainer = ({detailBuku, detailPengembalian, dataDiri, detailPinjaman} : DetailPengembalianContainerType) => {
    const {data} = detailBuku

    return (
        <section className="w-full">
            <BreadCrumbDetailBuku title={data.judul} from='Pengembalian' url='/my/data/pengembalian' />
            <DetailPengembalian data={detailPengembalian} dataDiri={dataDiri} dataPeminjaman={detailPinjaman} />
        </section>
    )
}

export default DetailPengembalianContainer