import { getSinglePerpanjanganPustakawan } from "@/actions/Pustakawan/Perpanjangan/pustakawanPerpanjanganActions"
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
import SinglePengajuanLoading from "@/components/Pustakawan/Pengajuan/SinglePengajuanLoading"

const PustakawanDetailPerpanjanganPage = () => {

    const { perpanjanganDetailTabsPustakawan } = useSelector((state: any) => state.perpanjanganState)
    const { idPerpanjangan } = useParams()
    const {data, isLoading} = useQuery({
        queryKey: ['detail', 'perpanjangan', idPerpanjangan],
        queryFn: () => getSinglePerpanjanganPustakawan(idPerpanjangan as string)
    })

    if (isLoading) return <SinglePengajuanLoading />
    const { idBuku: buku, idPengguna: dataPengguna, idPeminjaman: dataPeminjaman } = data
    
    const tanggalBerakhir = new Date(dataPeminjaman.berakhirPada)
    const tanggalMulai = new Date(dataPeminjaman.diterimaTanggal || dataPeminjaman.createdAt)

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
                    <Calendar
                        classNames={{day_selected: 'bg-destructive !hover:bg-destructive'}}
                        modifiers={{finish: tanggalBerakhir, start: tanggalMulai}}
                        selected={tanggalBerakhir}
                        defaultMonth={tanggalBerakhir}
                        modifiersClassNames={{
                            start: "bg-primary text-white rounded-full !hover:bg-primary",
                            finish: "bg-destructive text-white rounded-full"
                        }}
                        className="border rounded-lg" />
                </section>
            )}
        </Container>
    )
}

export default PustakawanDetailPerpanjanganPage