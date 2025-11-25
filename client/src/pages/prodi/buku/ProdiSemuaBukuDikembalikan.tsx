import Container from "@/globals/Container"
import PustakawanBreadCrumbs from "@/components/Pustakawan/PustakawanBreadCrumbs"
import { useSearchParams } from "react-router-dom"
import GrafikBukuContainer from "@/components/Pustakawan/Buku/GrafikBukuContainer"
import { useQuery } from "@tanstack/react-query"
import SemuaBukuFilter from "@/components/Pustakawan/Buku/SemuaBukuFilter"
import BukuLoading from "@/components/Pustakawan/Buku/BukuLoading"
import {prodiGetBukuDikembalikanAction} from '@/actions/Prodi/Buku'
import ProdiBukuDikembalikanTable from "@/components/Prodi/Buku/BukuDIkembalikan/ProdiBukuDikembalikanTable"

const ProdiSemuaBukuDikembalikan = () => {

  const [searchParams] = useSearchParams()
  const query = new URLSearchParams(searchParams).toString()

  const {data, isLoading} = useQuery({
    queryKey: ['buku', 'dikembalikan', query],
    queryFn: () => prodiGetBukuDikembalikanAction(query)
  })

  if (isLoading) return <BukuLoading />
  const { bukuDikembalikan, ratioBukuDikembalikan, statsBukuDikembalikan } = data

  return (
    <Container className="w-full">
      <PustakawanBreadCrumbs />
      <GrafikBukuContainer 
        judulStatistik='Pertumbuhan Pengembalian Buku Bulanan'
        judulRasio='Rasio Pengembalian Buku'
        dataRasio={ratioBukuDikembalikan}
        dataStatistik={statsBukuDikembalikan}
        labelDataRasio={['Total Buku', 'Buku Dikembalikan']}
      />

      <SemuaBukuFilter />
      <ProdiBukuDikembalikanTable dataBuku={bukuDikembalikan} />
    </Container>
  )
}

export default ProdiSemuaBukuDikembalikan