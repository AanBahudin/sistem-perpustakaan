import { Alert } from '@/components/ui/alert'
import DetailPengajuanHeader from '@/components/Pustakawan/Pengajuan/DetailPengajuanHeader'
import DetailBukuPengajuan from '@/components/Pustakawan/Pengajuan/DetailPeminjaman/DetailBukuPengajuan'
import DetailPemohonPengajuan from '@/components/Pustakawan/Pengajuan/DetailPeminjaman/DetailPemohonPengajuan'
import { Link } from 'react-router-dom'

type DataPengembalianPeminjamanType = {
    dataPeminjaman: any
}

const DataPengembalianPeminjaman = ({dataPeminjaman} : DataPengembalianPeminjamanType) => {

    const {diprosesOleh, buku, peminjam, dataPengembalian} = dataPeminjaman

    return (
        <section className='w-full flex items-start gap-x-8'>
            <main className='w-3/4 border rounded-xl min-h-[80vh] p-8 flex flex-col'>
                <DetailPengajuanHeader dataPustakawan={diprosesOleh} />
                <Alert className='w-full flex my-5 py-4 text-xs'>
                    <Link className='w-full underline' to={`/pustakawan/pengajuan/pengembalian/${dataPengembalian?._id}`}>Lihat Data Pengembalian</Link>
                </Alert>
                <DetailBukuPengajuan dataBuku={buku} />
            </main>

            <DetailPemohonPengajuan dataPemohon={peminjam} />
        </section>
    )
}

export default DataPengembalianPeminjaman