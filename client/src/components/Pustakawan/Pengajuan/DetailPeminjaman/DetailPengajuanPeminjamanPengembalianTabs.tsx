import DetailPengajuanInformation from "./DetailPengajuanInformation"
import { formatedDate } from "@/utils/formatDate"

const DetailPengajuanPeminjamanPengembalianTabs = ({dataPeminjaman} : {dataPeminjaman: any}) => {

    const {buku} = dataPeminjaman

    return (
        <section className='w-fuil p-4 bg-muted my-4 rounded-sm flex items-start gap-x-8'>
                <main className='w-full'>
                    <h1 className='text-sm font-light'>Detail Peminjaman</h1>
                    <p className='text-xs text-muted-foreground mt-2'>Peminjaman - {dataPeminjaman._id}</p>

                    <div className='w-full text-muted-foreground text-xs mt-4 gap-y-1 flex flex-col'>
                        <DetailPengajuanInformation label="Tanggal Pengajuan" value={formatedDate(dataPeminjaman.createdAt)} />
                        <DetailPengajuanInformation label="Durasi Peminjaman" value={dataPeminjaman.durasiPeminjaman + ' Hari'} />
                        <DetailPengajuanInformation label="Status Pengajuan" value={dataPeminjaman.statusPeminjaman} />
                        <DetailPengajuanInformation label="Judul Buku" value={buku?.judul?.slice(0, 22) || dataPeminjaman.judulBuku.slice(0, 22)} />
                    </div>
                </main>
        </section>
    )
}

export default DetailPengajuanPeminjamanPengembalianTabs