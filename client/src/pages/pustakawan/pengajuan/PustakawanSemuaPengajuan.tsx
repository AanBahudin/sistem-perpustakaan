import { getAllPengajuan } from "@/actions/Pustakawan/Peminjaman/pustakawanPengajuanActions"
import ActivitySection from "@/components/Pustakawan/Pengajuan/SemuaPengajuan/ActivitySection"
import GrafikPertumbuhanPengajuanContainer from "@/components/Pustakawan/Pengajuan/SemuaPengajuan/GrafikPertumbuhanPengajuanContainer"
import SemuaPengajuanLoading from "@/components/Pustakawan/Pengajuan/SemuaPengajuanLoading"
import PustakawanBreadCrumbs from "@/components/Pustakawan/PustakawanBreadCrumbs"
import Container from "@/globals/Container"
import { useQuery } from "@tanstack/react-query"


const SemuaPengajuan = () => {

  const {isLoading, data} = useQuery({
    queryKey: ['semua', 'pengajuan'],
    queryFn: getAllPengajuan
  })

  if (isLoading) return <SemuaPengajuanLoading />

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