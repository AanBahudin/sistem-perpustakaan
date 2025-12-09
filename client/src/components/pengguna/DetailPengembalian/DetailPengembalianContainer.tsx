import {BreadCrumbDetailBuku} from '../DetailBukuPengguna'
import {DetailPengembalian} from '@/components/pengguna/DetailPengembalian'

type DetailPengembalianContainerType = {
    detailPengembalian: any,
    detailBuku: any,
    dataDiri: any,
    detailPinjaman: any
}

const DetailPengembalianContainer = ({detailBuku, detailPengembalian, dataDiri, detailPinjaman} : DetailPengembalianContainerType) => {
    return (
        <section className="w-full">
            <BreadCrumbDetailBuku title={detailBuku.judul} from='Pengembalian' url='/my/data/pengembalian' />
            <DetailPengembalian data={detailPengembalian} dataDiri={dataDiri} dataPeminjaman={detailPinjaman} />
        </section>
    )
}

export default DetailPengembalianContainer