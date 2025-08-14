import Container from "@/globals/Container"
import PustakawanBreadCrumbs from "@/components/Pustakawan/PustakawanBreadCrumbs"
import { Button } from "@/components/ui/button"
import { Link, useSearchParams } from "react-router-dom"
import { Plus } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getAllBukuDiperpanjanganPustakawan } from "@/actions/Pustakawan/pustakawanBukuActions"
import GrafikBukuContainer from "@/components/Pustakawan/Buku/GrafikBukuContainer"
import TabelBukuDiperpanjang from "@/components/Pustakawan/Buku/BukuDiperpanjang/TabelBukuDiperpanjang"
import SemuaBukuFilter from "@/components/Pustakawan/Buku/SemuaBukuFilter"

const PustakawanBukuDiperpanjangPage = () => {

  const [searchParams] = useSearchParams()
  const query = new URLSearchParams(searchParams).toString()

  const {data, isLoading} = useQuery({
    queryKey: ['buku', 'diperpanjang', query],
    queryFn: () =>  getAllBukuDiperpanjanganPustakawan({query})
  })

  if (isLoading) return <h1>Loading .....</h1>
  const { bukuDiperpanjang, ratioBukuDiperpanjang, statsBukuDiperpanjangan } = data

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