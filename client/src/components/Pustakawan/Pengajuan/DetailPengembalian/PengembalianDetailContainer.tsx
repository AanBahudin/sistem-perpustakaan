import { Separator } from "@/components/ui/separator"
import DetailBukuPengajuan from "../DetailPeminjaman/DetailBukuPengajuan"

import DetailPengajuanPengembalian from "./DetailPengajuanPengembalian"
import InvoiceDetail from "./InvoiceDetail"

const PengembalianDetailContainer = ({pengembalian, buku, pengguna, peminjaman} : {pengembalian: any, buku: any, pengguna: any, peminjaman: any}) => {
    return (
        <section className='w-full flex items-start gap-x-3'>
            <main className='w-3/4 border rounded-xl min-h-[50vh] p-8'>
                <DetailBukuPengajuan dataBuku={buku} />

                <Separator className="my-4" />
                <DetailPengajuanPengembalian
                    pengguna={pengguna}
                    dataPengembalian={pengembalian} 
                    peminjaman={peminjaman} />
            </main>

            <InvoiceDetail pengembalian={pengembalian} />
        </section>
    )
}

export default PengembalianDetailContainer