import { getAllPengajuan } from "@/actions/Pustakawan/pustakawanPengajuanActions"
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

  return (
    <Container className="w-full">
      <PustakawanBreadCrumbs />

      {/* monthlyPengajuanGrowth harus bertipe aggregasi */}
      <GrafikPertumbuhanPengajuanContainer monthlyPengajuanGrowth={data.dataGrafik} pengajuanRatio={data.pengajuanRatio} />
    </Container>
  )
}

export default SemuaPengajuan