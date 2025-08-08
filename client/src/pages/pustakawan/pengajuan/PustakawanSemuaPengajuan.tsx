import { getAllPengajuan } from "@/actions/Pustakawan/pustakawanPengajuanActions"
import ActivitySection from "@/components/Pustakawan/Pengajuan/ActivitySection"
import GrafikPertumbuhanPengajuanContainer from "@/components/Pustakawan/Pengajuan/GrafikPertumbuhanPengajuanContainer"
import PustakawanBreadCrumbs from "@/components/Pustakawan/PustakawanBreadCrumbs"
import Container from "@/globals/Container"
import { useQuery } from "@tanstack/react-query"


const SemuaPengajuan = () => {

  const {isLoading, data} = useQuery({
    queryKey: ['semua', 'pengajuan'],
    queryFn: getAllPengajuan
  })

  if (isLoading) return <h1>Loading ... </h1>

  const {peminjaman, perpanjangan, pengembalian} = data

  return (
    <Container className="w-full">
      <PustakawanBreadCrumbs />
      <GrafikPertumbuhanPengajuanContainer monthlyPengajuanGrowth={data.dataGrafik} pengajuanRatio={data.pengajuanRatio} />

      <ActivitySection peminjaman={peminjaman} perpanjangan={perpanjangan} pengembalian={pengembalian} />
    </Container>
  )
}

export default SemuaPengajuan