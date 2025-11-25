import Container from "@/globals/Container"
import PustakawanBreadCrumbs from "@/components/Pustakawan/PustakawanBreadCrumbs"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Plus } from "lucide-react"
import GrafikBukuContainer from "@/components/Pustakawan/Buku/GrafikBukuContainer"
import TabelBukuDiperpanjang from "@/components/Pustakawan/Buku/BukuDiperpanjang/TabelBukuDiperpanjang"
import SemuaBukuFilter from "@/components/Pustakawan/Buku/SemuaBukuFilter"
import BukuLoading from "@/components/Pustakawan/Buku/BukuLoading"
import { useGetBukuPerpanjangPustakawan } from "@/hooks/fetchHooks/pustakawanHooks/bukuHooks"

const PustakawanBukuDiperpanjangPage = () => {

  const { isLoading, bukuDiperpanjang, ratioBukuDiperpanjang, statsBukuDiperpanjangan } = useGetBukuPerpanjangPustakawan()
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
        judulStatistik='Pertumbuhan Perpanjangan Buku Bulanan'
        judulRasio='Rasio Perpanjangan Buku'
        dataRasio={ratioBukuDiperpanjang}
        dataStatistik={statsBukuDiperpanjangan}
        labelDataRasio={['Total Buku', 'Buku Diperpanjang']}
      />

      <SemuaBukuFilter />

      <TabelBukuDiperpanjang dataBuku={bukuDiperpanjang} />
    </Container>
  )
}

export default PustakawanBukuDiperpanjangPage