import Container from "@/globals/Container"
import PustakawanBreadCrumbs from "@/components/Pustakawan/PustakawanBreadCrumbs"
import { Link, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import GrafikBukuContainer from "@/components/Pustakawan/Buku/GrafikBukuContainer"
import { useQuery } from "@tanstack/react-query"
import { getAllBukuDikembalikanPustakawan } from "@/actions/Pustakawan/pustakawanBukuActions"
import SemuaBukuFilter from "@/components/Pustakawan/Buku/SemuaBukuFilter"
import TabelBukuDikembalikan from "@/components/Pustakawan/Buku/BukuDIkembalikan/TabelBukuDikembalikan"
import BukuLoading from "@/components/Pustakawan/Buku/BukuLoading"

const PustakawanBukuDikembalikanPage = () => {

  const [searchParams] = useSearchParams()
  const query = new URLSearchParams(searchParams).toString()

  const {data, isLoading} = useQuery({
    queryKey: ['buku', 'dikembalikan', query],
    queryFn: () => getAllBukuDikembalikanPustakawan({query})
  })

  if (isLoading) return <BukuLoading />
  const { bukuDikembalikan, ratioBukuDikembalikan, statsBukuDikembalikan } = data

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