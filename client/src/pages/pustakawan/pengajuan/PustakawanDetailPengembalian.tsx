import Container from "@/globals/Container"
import DetailPengajuanBreadCrumbs from "@/components/Pustakawan/Pengajuan/DetailPengajuanBreadCrumbs"
import { useQuery } from "@tanstack/react-query"
import { getSinglePengembalianPustakawan } from "@/actions/Pustakawan/pustakawanPengembalianActions"
import { useParams } from "react-router-dom"
import DetailPengembalianTabs from "@/components/Pustakawan/Pengajuan/DetailPengembalian/DetailPengembalianTabs"
import PengembalianApprovalContainer from "@/components/Pustakawan/Pengajuan/DetailPengembalian/PengembalianApprovalContainer"


const PustakawanDetailPengembalian = () => {

    const {idPengembalian} = useParams()
    const {data, isLoading} = useQuery({
        queryKey: ['detail', 'pengembalian', idPengembalian],
        queryFn: () => getSinglePengembalianPustakawan(idPengembalian as string)
    })

    if (isLoading) return <h1>Loading .... </h1>
    
    const {idBuku: buku} = data
    console.log(data)

    return (
        <Container className="w-full">
            <DetailPengajuanBreadCrumbs text={buku.judul} />
            <PengembalianApprovalContainer pengembalian={data} />
            <DetailPengembalianTabs />
            {/* <PerpanjanganApprovalContainer perpanjangan={data} />

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
            )} */}
        </Container>
    )
}

export default PustakawanDetailPengembalian