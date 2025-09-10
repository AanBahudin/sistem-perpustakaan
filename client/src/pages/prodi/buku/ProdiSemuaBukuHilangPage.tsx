import Container from '@/globals/Container'
import { useSearchParams } from 'react-router-dom'
import GrafikBukuContainer from '@/components/Pustakawan/Buku/GrafikBukuContainer'
import SemuaBukuFilter from '@/components/Pustakawan/Buku/SemuaBukuFilter'
import { useQuery } from '@tanstack/react-query'
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import TabelBukuHilang from '@/components/Pustakawan/Buku/BukuDihilangkan/TabelBukuHIlang'
import BukuLoading from '@/components/Pustakawan/Buku/BukuLoading'
import { prodiGetAllBukuDihilangkan } from '@/actions/Prodi/prodiBukuActions'

const ProdiSemuaBukuHilangPage = () => {

  const [searchParams] = useSearchParams()
  const query = new URLSearchParams(searchParams).toString()
  
  const {data, isLoading} = useQuery({
    queryKey: ['buku', 'dihilangkan', query],
    queryFn: () => prodiGetAllBukuDihilangkan(query)
  })
  
  if (isLoading) return <BukuLoading />
  const { bukuDihilangkan, ratioBukuDihilangkan, statsBukuDihilangkan } = data

  return (
    <Container className="w-full">
      <PustakawanBreadCrumbs />
    
      <GrafikBukuContainer 
        judulStatistik='Pertumbuhan Kehilangan Buku Bulanan'
        judulRasio='Rasio Kehilangan Buku'
        dataRasio={ratioBukuDihilangkan}
        dataStatistik={statsBukuDihilangkan}
        labelDataRasio={['Total Buku', 'Buku Hilang']}
      />
    
      <SemuaBukuFilter />
      <TabelBukuHilang dataBuku={bukuDihilangkan} />
    </Container>
  )
}

export default ProdiSemuaBukuHilangPage