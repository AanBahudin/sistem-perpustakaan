import { getAllBukuPustakawan } from "@/actions/Pustakawan/pustakawanBukuActions"
import BukuLoading from "@/components/Pustakawan/Buku/BukuLoading"
import GrafikBukuContainer from "@/components/Pustakawan/Buku/GrafikBukuContainer"
import SemuaBukuFilter from "@/components/Pustakawan/Buku/SemuaBukuFilter"
import TabelSemuaBuku from "@/components/Pustakawan/Buku/TabelSemuaBuku"
import PustakawanBreadCrumbs from "@/components/Pustakawan/PustakawanBreadCrumbs"
import { Button } from "@/components/ui/button"
import Container from "@/globals/Container"
import { useQuery } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { Link, useSearchParams } from "react-router-dom"


const PustakawanSemuaBukuPage = () => {

  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const {data, isLoading} = useQuery({
    queryKey: ['semua', 'buku', params],
    queryFn: () => getAllBukuPustakawan({query: params})
  })

  if (isLoading) return <BukuLoading />
  
  const { dataBuku, dataRasio, dataStats } = data
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
        judulRasio='Rasio Kategori Buku'
        labelDataRasio={[]}
        type="Semua"
      />
      <SemuaBukuFilter />
      <TabelSemuaBuku dataBuku={dataBuku} />
    </Container>
  )
}

export default PustakawanSemuaBukuPage