import { formatedDate } from "@/utils/formatDate"
import DetailPengajuanInformation from "./DetailPengajuanInformation"

const DetailPengajuanPeminjaman = ({dataPeminjaman} : {dataPeminjaman: any}) => {

    const {buku, peminjam} = dataPeminjaman

    return (
        <section className='w-fuil p-4 bg-muted my-4 rounded-sm flex items-start gap-x-8'>
            <main className='w-1/2'>
                <h1 className='text-sm font-light'>Detail Peminjaman</h1>
                <p className='text-xs text-muted-foreground mt-2'>Peminjaman - {dataPeminjaman._id}</p>

                <div className='w-full text-muted-foreground text-xs mt-4 gap-y-1 flex flex-col'>
                    <DetailPengajuanInformation label="Tanggal Pengajuan" value={formatedDate(dataPeminjaman.createdAt)} />
                    <DetailPengajuanInformation label="Durasi Peminjaman" value={dataPeminjaman.durasiPeminjaman + ' Hari'} />
                    <DetailPengajuanInformation label="Status Pengajuan" value={dataPeminjaman.statusPeminjaman} />
                    <DetailPengajuanInformation label="Judul Buku" value={buku.judul.slice(0, 22)} />
                </div>
            </main>

            <main className='flex-1 flex flex-col items-end h-fit'>
                <h1 className='text-sm font-light'>Diajukan Oleh</h1>
                <p className='text-xs text-muted-foreground mt-2 font-semibold'>{peminjam.nama}</p>
                <p className='text-xs text-muted-foreground'>{peminjam.email}</p>
                <p className='text-xs text-muted-foreground'>{peminjam.idKampus} - {dataPeminjaman.peminjam.role}</p>
            </main>
        </section>
  )
}

export default DetailPengajuanPeminjaman