import DetailColumn from "./DetailColumn"
import InvoiceColumn from "./InvoiceColumn"


type DetailPengembalianType = {
    data: any,
    dataDiri: any
}

const DetailPengembalian = ({data, dataDiri} : DetailPengembalianType) => {

    const {idBuku: buku, idPeminjaman: peminjaman} = data
    // const {_id, judul, stok, tagline, deskripsi, cover} = buku

    return (
        <section className="w-full grid grid-cols-12 gap-x-4 mt-10">
            <DetailColumn profileData={dataDiri} buku={buku} peminjaman={peminjaman} pengembalian={data}  />
            <InvoiceColumn />
        </section>
    )
}

export default DetailPengembalian