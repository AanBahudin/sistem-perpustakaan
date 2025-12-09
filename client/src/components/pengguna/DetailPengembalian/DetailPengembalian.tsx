import { InvoiceColumn, PengembalianDetailColumn } from "."

type DetailPengembalianType = {
    data: any,
    dataDiri: any,
    dataPeminjaman: any
}

const DetailPengembalian = ({data, dataDiri, dataPeminjaman} : DetailPengembalianType) => {

    const {idBuku: buku} = data

    return (
        <section className="w-full grid grid-cols-12 gap-x-4 mt-10">
            <PengembalianDetailColumn profileData={dataDiri} buku={buku} peminjaman={dataPeminjaman} />
            <InvoiceColumn dataPengembalian={data} dataPinjaman={dataPeminjaman} />
        </section> 
    )
}

export default DetailPengembalian