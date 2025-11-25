import Container from "@/globals/Container"
import PustakawanBreadCrumbs from "@/components/Pustakawan/PustakawanBreadCrumbs"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import GrafikBukuContainer from "@/components/Pustakawan/Buku/GrafikBukuContainer"
import SemuaBukuFilter from "@/components/Pustakawan/Buku/SemuaBukuFilter"
import TabelBukuDikembalikan from "@/components/Pustakawan/Buku/BukuDIkembalikan/TabelBukuDikembalikan"
import BukuLoading from "@/components/Pustakawan/Buku/BukuLoading"
import { useGetBukuKembaliPustakawan } from "@/hooks/fetchHooks/pustakawanHooks/bukuHooks"

const PustakawanBukuDikembalikanPage = () => {

  const { isLoading, bukuDikembalikan, ratioBukuDikembalikan, statsBukuDikembalikan } = useGetBukuKembaliPustakawan()
  if (isLoading) return <BukuLoading />

  return (
    <Container className="w-full">
      <section className="w-full flex items-center justify-between">
        <PustakawanBreadCrumbs />
        <Button className="w-fit h-8 rounded border mb-4">
          <Link   to='/' className="flex items-center gap-x-2 text-xs text-white"><Plus className="stroke-white" /> Tambah Buku</Link>
        </Button>
      </section>

      <GrafikBukuContainer 
        judulStatistik='Pertumbuhan Pengembalian Buku Bulanan'
        judulRasio='Rasio Pengembalian Buku'
        dataRasio={ratioBukuDikembalikan}
        dataStatistik={statsBukuDikembalikan}
        labelDataRasio={['Total Buku', 'Buku Dikembalikan']}
      />

      <SemuaBukuFilter />
      <TabelBukuDikembalikan dataBuku={bukuDikembalikan} />
    </Container>
  )
}

export default PustakawanBukuDikembalikanPage