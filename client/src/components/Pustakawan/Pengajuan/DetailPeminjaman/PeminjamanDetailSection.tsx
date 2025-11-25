import DetailPengajuanPeminjaman from '@/components/Pustakawan/Pengajuan/DetailPeminjaman/DetailPengajuanPeminjaman'
import DetailPengajuanHeader from '../DetailPengajuanHeader'
import DetailPemohonPengajuan from './DetailPemohonPengajuan'
import DetailBukuPengajuan from './DetailBukuPengajuan'

type PeminjamanDetailSectionType = {
    dataPeminjaman: any
}

const PeminjamanDetailSection = ({dataPeminjaman} : PeminjamanDetailSectionType) => {

    const { diprosesOleh, buku, peminjam } = dataPeminjaman

    return (
        <section className='w-full flex items-start gap-x-8'>
            <main className='w-3/4 border rounded-xl min-h-[80vh] p-8'>
                <DetailPengajuanHeader dataPustakawan={diprosesOleh} />
                <DetailPengajuanPeminjaman dataPeminjaman={dataPeminjaman} />
                <DetailBukuPengajuan dataBuku={buku} />
            </main>

            <DetailPemohonPengajuan dataPemohon={peminjam} />
        </section>
    )
}

export default PeminjamanDetailSection