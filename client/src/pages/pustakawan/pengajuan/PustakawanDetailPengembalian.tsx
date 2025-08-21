import Container from "@/globals/Container"
import DetailPengajuanBreadCrumbs from "@/components/Pustakawan/Pengajuan/DetailPengajuanBreadCrumbs"
import { useQuery } from "@tanstack/react-query"
import { getSinglePengembalianPustakawan } from "@/actions/Pustakawan/pustakawanPengembalianActions"
import { useParams } from "react-router-dom"
import DetailPengembalianTabs from "@/components/Pustakawan/Pengajuan/DetailPengembalian/DetailPengembalianTabs"
import PengembalianDetailContainer from "@/components/Pustakawan/Pengajuan/DetailPengembalian/PengembalianDetailContainer"
import { useSelector } from "react-redux"
import DetailPengajuanHeader from "@/components/Pustakawan/Pengajuan/DetailPengajuanHeader"
import DetailBukuPengajuan from "@/components/Pustakawan/Pengajuan/DetailPeminjaman/DetailBukuPengajuan"
import { Calendar } from "@/components/ui/calendar"
import DetailPengajuanPeminjaman from "@/components/Pustakawan/Pengajuan/DetailPeminjaman/DetailPengajuanPeminjaman"

const PustakawanDetailPengembalian = () => {

    const {idPengembalian} = useParams()
    const {data, isLoading} = useQuery({
        queryKey: ['detail', 'pengembalian', idPengembalian],
        queryFn: () => getSinglePengembalianPustakawan(idPengembalian as string)
    })

    const { pustakawanPengembalianTab } = useSelector((state: any) => state.pengembalianState)

    if (isLoading) return <h1>Loading .... </h1>
    const {idBuku: buku, idPeminjaman: peminjaman, idPengguna: pengguna} = data
    const {createdAt: tanggalMulai, berakhirPada: tanggalBerakhir} = peminjaman

    return (
        <Container className="w-full">
            <DetailPengajuanBreadCrumbs text={buku.judul} />
            <DetailPengembalianTabs />
            
            {pustakawanPengembalianTab === 'Pengajuan' ? (
                <PengembalianDetailContainer buku={buku} pengembalian={data} pengguna={pengguna} peminjaman={peminjaman} />
            ) : (
                <section className='w-full flex items-start gap-x-8'>
                    <main className='w-3/4 border rounded-xl min-h-[50vh] p-8'>
                        <DetailPengajuanHeader />
                        <DetailPengajuanPeminjaman dataPeminjaman={peminjaman} />
                        {/* <PeminjamanDetailPage dataBuku={buku} dataPeminjaman={dataPeminjaman} pengguna={dataPengguna} /> */}
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

export default PustakawanDetailPengembalian