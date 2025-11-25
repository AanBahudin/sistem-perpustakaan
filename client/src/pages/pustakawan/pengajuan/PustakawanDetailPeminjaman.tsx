import Container from '@/globals/Container'
import { useSelector } from 'react-redux'
import DetailPengajuanBreadCrumbs from '@/components/Pustakawan/Pengajuan/DetailPengajuanBreadCrumbs'
import PeminjamanApprovalContainer from '@/components/Pustakawan/Pengajuan/DetailPeminjaman/PeminjamanApprovalContainer'
import DetailPeminjamanTabs from '@/components/Pustakawan/Pengajuan/DetailPeminjaman/DetailPeminjamanTabs'
import BuatPengembalianSection from '@/components/Pustakawan/Pengajuan/DetailPeminjaman/BuatPengembalianSection'
import SinglePengajuanLoading from '@/components/Pustakawan/Pengajuan/SinglePengajuanLoading'
import { useGetDetailPinjamanPustakawan } from '@/hooks/fetchHooks/pustakawanHooks/peminjamanHooks'
import PeminjamanDetailSection from '@/components/Pustakawan/Pengajuan/DetailPeminjaman/PeminjamanDetailSection'
import DataPengembalianPeminjaman from '@/components/Pustakawan/Pengajuan/DetailPeminjaman/DataPengembalianPeminjaman'

const PustakawanDetailPeminjaman = () => {
    
    const {dataPeminjaman, isLoading} = useGetDetailPinjamanPustakawan()
    const { pustakawanDetailPeminjamanActiveTabs } = useSelector((state: any) => state.peminjamanState)
    
    if (isLoading) return <SinglePengajuanLoading />
    const {buku, dataPengembalian} = dataPeminjaman

    return (
        <Container className='w-full'>
            <DetailPengajuanBreadCrumbs text={buku.judul} />
            <PeminjamanApprovalContainer peminjaman={dataPeminjaman} />
            <DetailPeminjamanTabs peminjaman={dataPeminjaman} idPengembalian={dataPengembalian} />

            {/* JIKA TAB PEMINJAMAN AKTIF */}
            {pustakawanDetailPeminjamanActiveTabs === 'Peminjaman' && <PeminjamanDetailSection dataPeminjaman={dataPeminjaman} />}
            {/* JIKA TAB DATA PENGEMBALIAN AKTIF */}
            {pustakawanDetailPeminjamanActiveTabs === 'Data Pengembalian' && <DataPengembalianPeminjaman dataPeminjaman={dataPeminjaman} />}
            {/* JIKA TAB BUAT PENGEMBALIAN AKTIF */}
            {pustakawanDetailPeminjamanActiveTabs === 'Buat Pengembalian' && <BuatPengembalianSection dataPeminjaman={dataPeminjaman} />}
        </Container>
    )
}

export default PustakawanDetailPeminjaman