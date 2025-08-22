import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getDetailPengajuanPeminjaman } from '@/actions/Pustakawan/pustakawanPengajuanActions'
import DetailPengajuanBreadCrumbs from '@/components/Pustakawan/Pengajuan/DetailPengajuanBreadCrumbs'
import PeminjamanApprovalContainer from '@/components/Pustakawan/Pengajuan/DetailPeminjaman/PeminjamanApprovalContainer'
import DetailPengajuanHeader from '@/components/Pustakawan/Pengajuan/DetailPengajuanHeader'
import DetailPengajuanPeminjaman from '@/components/Pustakawan/Pengajuan/DetailPeminjaman/DetailPengajuanPeminjaman'
import DetailBukuPengajuan from '@/components/Pustakawan/Pengajuan/DetailPeminjaman/DetailBukuPengajuan'
import DetailPemohonPengajuan from '@/components/Pustakawan/Pengajuan/DetailPeminjaman/DetailPemohonPengajuan'
import DetailPeminjamanTabs from '@/components/Pustakawan/Pengajuan/DetailPeminjaman/DetailPeminjamanTabs'
import BuatPengembalianSection from '@/components/Pustakawan/Pengajuan/DetailPeminjaman/BuatPengembalianSection'
import SinglePengajuanLoading from '@/components/Pustakawan/Pengajuan/SinglePengajuanLoading'

const PustakawanDetailPeminjaman = () => {

    const { idPeminjaman } = useParams()
    const {data, isLoading} = useQuery({
        queryKey: ['detail', 'peminjaman', idPeminjaman],
        queryFn: () => getDetailPengajuanPeminjaman({id: idPeminjaman as string})
    })

    const { pustakawanDetailPeminjamanActiveTabs } = useSelector((state: any) => state.peminjamanState)
    
    if (isLoading) return <SinglePengajuanLoading />
    const {buku, peminjam} = data

    return (
        <Container className='w-full'>
            
            <DetailPengajuanBreadCrumbs text={data.buku.judul} />
            <PeminjamanApprovalContainer peminjaman={data} />
            <DetailPeminjamanTabs peminjaman={data} idPengembalian={data.dataPengembalian} />

            {/* JIKA TAB PEMINJAMAN AKTIF */}
            {pustakawanDetailPeminjamanActiveTabs === 'Peminjaman' && (
                <section className='w-full flex items-start gap-x-8'>
                    <main className='w-3/4 border rounded-xl min-h-[80vh] p-8'>
                        <DetailPengajuanHeader />
                        <DetailPengajuanPeminjaman dataPeminjaman={data} />
                        <DetailBukuPengajuan dataBuku={buku} />
                    </main>

                    <DetailPemohonPengajuan dataPemohon={peminjam} />
                </section>
            )}

            {/* JIKA TAB DATA PENGEMBALIAN AKTIF */}
            {pustakawanDetailPeminjamanActiveTabs === 'Data Pengembalian' && (
                <section className='w-full flex items-start gap-x-8'>
                    <main className='w-3/4 border rounded-xl min-h-[80vh] p-8'>
                        <DetailPengajuanHeader />
                        <DetailBukuPengajuan dataBuku={buku} />
                    </main>

                    <DetailPemohonPengajuan dataPemohon={peminjam} />
                </section>
            )}

            {/* JIKA TAB BUAT PENGEMBALIAN AKTIF */}
            {pustakawanDetailPeminjamanActiveTabs === 'Buat Pengembalian' && <BuatPengembalianSection buku={buku} peminjaman={data} />}
        </Container>
    )
}

export default PustakawanDetailPeminjaman