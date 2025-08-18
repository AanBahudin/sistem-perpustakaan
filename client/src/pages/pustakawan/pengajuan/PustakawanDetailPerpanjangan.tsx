import { getSinglePerpanjanganPustakawan } from "@/actions/Pustakawan/pustakawanPerpanjanganActions"
import DetailPengajuanBreadCrumbs from "@/components/Pustakawan/Pengajuan/DetailPengajuanBreadCrumbs"
import PerpanjanganApprovalContainer from "@/components/Pustakawan/Pengajuan/DetailPerpanjangan/PerpanjanganApprovalContainer"
import DetailPengajuanHeader from "@/components/Pustakawan/Pengajuan/DetailPengajuanHeader"
import Container from "@/globals/Container"
import DetailBukuPengajuan from "@/components/Pustakawan/Pengajuan/DetailPeminjaman/DetailBukuPengajuan"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import DetailPemohonPengajuan from "@/components/Pustakawan/Pengajuan/DetailPeminjaman/DetailPemohonPengajuan"
import DetailPengajuanPerpanjangan from "@/components/Pustakawan/Pengajuan/DetailPerpanjangan/DetailPengajuanPerpanjangan"
import DetailPerpanjanganTabs from "@/components/Pustakawan/Pengajuan/DetailPerpanjangan/DetailPerpanjanganTabs"
import { useSelector } from "react-redux"
import { Calendar } from "@/components/ui/calendar"
import PerpanjanganDetailPeminjamanSection from "@/components/Pustakawan/Pengajuan/DetailPerpanjangan/PerpanjanganDetailPeminjamanSection"

const PustakawanDetailPerpanjanganPage = () => {

    const { perpanjanganDetailTabsPustakawan } = useSelector((state: any) => state.perpanjanganState)
    const { idPerpanjangan } = useParams()
    const {data, isLoading} = useQuery({
        queryKey: ['detail', 'perpanjangan', idPerpanjangan],
        queryFn: () => getSinglePerpanjanganPustakawan(idPerpanjangan as string)
    })

    if (isLoading) return <h1>Loading ...</h1>
    const { idBuku: buku, idPengguna: dataPengguna, idPeminjaman: dataPeminjaman } = data

    return (
        <Container className="w-full">
            <DetailPengajuanBreadCrumbs text={buku.judul} />
            <PerpanjanganApprovalContainer perpanjangan={data} />

            <DetailPerpanjanganTabs />

            {perpanjanganDetailTabsPustakawan === 'Pengajuan' ? (
                <section className='w-full flex items-start gap-x-8'>
                    <main className='w-3/4 border rounded-xl min-h-[80vh] p-8'>
                        <DetailPengajuanHeader />
                        <DetailPengajuanPerpanjangan dataPerpanjangan={data} />
                        <DetailBukuPengajuan dataBuku={buku} />
                    </main>

                    <DetailPemohonPengajuan dataPemohon={dataPengguna} />
                </section>
            ) : (
                <section className='w-full flex items-start gap-x-8'>
                    <main className='w-3/4 border rounded-xl min-h-[80vh] p-8'>
                        <DetailPengajuanHeader />
                        <PerpanjanganDetailPeminjamanSection dataBuku={buku} dataPeminjaman={dataPeminjaman} pengguna={dataPengguna} />
                        <DetailBukuPengajuan dataBuku={buku} /> 
                    </main>
                    <Calendar className="border rounded-lg" />
                </section>
            )}


        </Container>
    )
}

export default PustakawanDetailPerpanjanganPage