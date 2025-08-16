import { getDetailPengajuanPeminjaman } from '@/actions/Pustakawan/pustakawanPengajuanActions'
import DetailPengajuanBreadCrumbs from '@/components/Pustakawan/Pengajuan/DetailPengajuanBreadCrumbs'
import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import PeminjamanApprovalContainer from '@/components/Pustakawan/Pengajuan/DetailPeminjaman/PeminjamanApprovalContainer'
import DetailPengajuanHeader from '@/components/Pustakawan/Pengajuan/DetailPengajuanHeader'
import DetailPengajuanPeminjaman from '@/components/Pustakawan/Pengajuan/DetailPeminjaman/DetailPengajuanPeminjaman'
import DetailBukuPengajuan from '@/components/Pustakawan/Pengajuan/DetailPeminjaman/DetailBukuPengajuan'
import DetailPemohonPengajuan from '@/components/Pustakawan/Pengajuan/DetailPeminjaman/DetailPemohonPengajuan'

const PustakawanDetailPeminjaman = () => {

    const { idPeminjaman } = useParams()
    const {data, isLoading} = useQuery({
        queryKey: ['detail', 'peminjaman', idPeminjaman],
        queryFn: () => getDetailPengajuanPeminjaman({id: idPeminjaman as string})
    })
    
    
    if (isLoading) return <h1>Loading ... </h1>
    const {statusPeminjaman, buku, peminjam} = data

    return (
        <Container className='w-full'>
            <DetailPengajuanBreadCrumbs text={data.buku.judul} />

            {statusPeminjaman === 'Diajukan' && <PeminjamanApprovalContainer peminjaman={data} />}
            
            <section className='w-full flex items-start gap-x-8'>
                <main className='w-3/4 border rounded-xl min-h-[80vh] p-8'>
                    <DetailPengajuanHeader />
                    <DetailPengajuanPeminjaman dataPeminjaman={data} />
                    <DetailBukuPengajuan dataBuku={buku} />
                </main>

                <DetailPemohonPengajuan dataPemohon={peminjam} />
            </section>

        </Container>
    )
}

export default PustakawanDetailPeminjaman