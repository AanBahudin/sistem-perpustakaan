import DetailPengajuanInformation from '../DetailPeminjaman/DetailPengajuanInformation'
import { formatedDate } from '@/utils/formatDate'

const DetailPengajuanPerpanjangan = ({dataPerpanjangan} : {dataPerpanjangan: any}) => {

    const {idBuku: buku, idPengguna: peminjam} = dataPerpanjangan

    return (
        <section className='w-fuil p-4 bg-muted my-4 rounded-sm flex items-start gap-x-8'>
            <main className='w-1/2'>
                <h1 className='text-sm font-light'>Detail Perpanjangan</h1>
                <p className='text-xs text-muted-foreground mt-2'>Perpanjangan - {dataPerpanjangan._id}</p>

                <div className='w-full text-muted-foreground text-xs mt-4 gap-y-1 flex flex-col'>
                    <DetailPengajuanInformation label="Tanggal Pengajuan" value={formatedDate(dataPerpanjangan.createdAt)} />
                    <DetailPengajuanInformation label="Durasi Peminjaman" value={dataPerpanjangan.durasi + ' Hari'} />
                    <DetailPengajuanInformation label="Status Pengajuan" value={dataPerpanjangan.disetujui} />
                    <DetailPengajuanInformation label="Judul Buku" value={buku.judul.slice(0, 22)} />
                    <div className='w-full flex'>
                        <p className='w-1/2'>Alasan Pengajuan</p>
                        <p className='w-1/2 min-h-10 border rounded p-1 overflow-y-scroll ml-2 scroll-custom'>{dataPerpanjangan.alasan}</p>
                    </div>
                </div>
            </main>

            <main className='flex-1 flex flex-col items-end h-fit'>
                <h1 className='text-sm font-light'>Diajukan Oleh</h1>
                <p className='text-xs text-muted-foreground mt-2 font-semibold'>{peminjam.nama}</p>
                <p className='text-xs text-muted-foreground'>{peminjam.email}</p>
                <p className='text-xs text-muted-foreground'>{peminjam.idKampus} - {peminjam.role}</p>
            </main>
        </section>
    )
}

export default DetailPengajuanPerpanjangan