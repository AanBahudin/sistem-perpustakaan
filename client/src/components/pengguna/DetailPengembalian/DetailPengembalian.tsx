import DetailColumn from "./DetailColumn"
import InvoiceColumn from "./InvoiceColumn"


type DetailPengembalianType = {
    data: any,
    dataDiri: any,
    dataPeminjaman: any
}

const DetailPengembalian = ({data, dataDiri, dataPeminjaman} : DetailPengembalianType) => {


    console.log('data pengembalian', data.idPeminjaman._id)
    console.log('data peminjaman ', dataPeminjaman._id)

    const {idBuku: buku} = data
    // const {_id, judul, stok, tagline, deskripsi, cover} = buku

    return (
        <section className="w-full grid grid-cols-12 gap-x-4 mt-10">
            <DetailColumn profileData={dataDiri} buku={buku} peminjaman={dataPeminjaman} pengembalian={data}  />
            <InvoiceColumn dataPengembalian={data} dataPinjaman={dataPeminjaman} />
        </section>
    )
}

export default DetailPengembalian