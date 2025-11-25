import DataPagination from "@/components/pengguna/peminjaman Pengguna/DataPagination"
import BukuLoading from "@/components/Pustakawan/Buku/BukuLoading"
import GrafikBukuContainer from "@/components/Pustakawan/Buku/GrafikBukuContainer"
import SemuaBukuFilter from "@/components/Pustakawan/Buku/SemuaBukuFilter"
import TabelSemuaBuku from "@/components/Pustakawan/Buku/TabelSemuaBuku"
import PustakawanBreadCrumbs from "@/components/Pustakawan/PustakawanBreadCrumbs"
import { Button } from "@/components/ui/button"
import Container from "@/globals/Container"
import { useGetAllBukuPustakawan } from "@/hooks/fetchHooks/pustakawanHooks/bukuHooks"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"


const PustakawanSemuaBukuPage = () => {

  const { isLoading, dataBuku, dataRasio, dataStats, totalPage } = useGetAllBukuPustakawan()
  if (isLoading) return <BukuLoading />

  return (
    <Container className="w-full">
      <section className="w-full flex items-center justify-between">
        <PustakawanBreadCrumbs />
        <Button className="w-fit h-8 rounded border mb-4">
          <Link to='/pustakawan/buku/buat' className="flex items-center gap-x-2 text-xs text-white"><Plus className="stroke-white" /> Tambah Buku</Link>
        </Button>
      </section>
      <GrafikBukuContainer 
        dataRasio={dataRasio}
        dataStatistik={dataStats}
        judulStatistik='Statistik Penambahan Buku Bulanan'
        judulRasio='Rasio Kategori Terbanyak'
        labelDataRasio={[]}
        type="Semua"
      />
      <SemuaBukuFilter />
      <TabelSemuaBuku dataBuku={dataBuku} />

      <DataPagination totalPage={totalPage} />
    </Container>
  )
}

export default PustakawanSemuaBukuPage