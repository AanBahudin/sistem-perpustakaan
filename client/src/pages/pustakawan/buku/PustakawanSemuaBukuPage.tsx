import { getAllBukuPustakawan } from "@/actions/Pustakawan/pustakawanBukuActions"
import GrafikBukuContainer from "@/components/Pustakawan/Buku/GrafikBukuContainer"
import SemuaBukuFilter from "@/components/Pustakawan/Buku/SemuaBukuFilter"
import PustakawanBreadCrumbs from "@/components/Pustakawan/PustakawanBreadCrumbs"
import Container from "@/globals/Container"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"


const PustakawanSemuaBukuPage = () => {

  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const {data, isLoading} = useQuery({
    queryKey: ['semua', 'buku'],
    queryFn: () => getAllBukuPustakawan({query: params})
  })

  if (isLoading) return <h1>Loading ... </h1>
  
  const { dataBuku, dataRasio, dataStats } = data
  return (
    <Container className="w-full">
      <PustakawanBreadCrumbs />
      <GrafikBukuContainer 
        dataRasio={dataRasio}
        dataStatistik={dataStats}
        judulStatistik='Statistik Penambahan Buku Bulanan'
        judulRasio='Rasio Kategori Buku'
        labelDataRasio={[]}
      />
      <SemuaBukuFilter />
    </Container>
  )
}

export default PustakawanSemuaBukuPage