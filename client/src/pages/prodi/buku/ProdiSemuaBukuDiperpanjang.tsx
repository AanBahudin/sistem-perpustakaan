import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import GrafikBukuContainer from '@/components/Pustakawan/Buku/GrafikBukuContainer'
import SemuaBukuFilter from '@/components/Pustakawan/Buku/SemuaBukuFilter'
import BukuLoading from '@/components/Pustakawan/Buku/BukuLoading'
import { prodiGetAllBukuDiperpanjang } from '@/actions/Prodi/prodiBukuActions'
import TabelBukuDiperpanjang from '@/components/Pustakawan/Buku/BukuDiperpanjang/TabelBukuDiperpanjang'

const ProdiSemuaBukuDiperpanjang = () => {

  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()
  
  const {isLoading, data} = useQuery({
    queryKey: ['buku', 'dipinjam', params],
    queryFn: () => prodiGetAllBukuDiperpanjang(params)
  })
  
  
  if (isLoading) return <BukuLoading />
  const { bukuDiperpanjang, ratioBukuDiperpanjang, statsBukuDiperpanjangan } = data

  return (
    <Container className="w-full">
      <PustakawanBreadCrumbs />
      
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

export default ProdiSemuaBukuDiperpanjang