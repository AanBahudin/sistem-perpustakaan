import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import GrafikBukuContainer from '@/components/Pustakawan/Buku/GrafikBukuContainer'
import SemuaBukuFilter from '@/components/Pustakawan/Buku/SemuaBukuFilter'
import BukuLoading from '@/components/Pustakawan/Buku/BukuLoading'
import {prodiGetBukuDipinjamAction} from '@/actions/Prodi/Buku'
import ProdiBukuDipinjamTable from '@/components/Prodi/Buku/BukuDipinjam/ProdiBukuDipinjamTable'

const ProdiSemuaBukuDipinjam = () => {

  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const {isLoading, data} = useQuery({
    queryKey: ['buku', 'dipinjam', params],
    queryFn: () => prodiGetBukuDipinjamAction(params)
  })


  if (isLoading) return <BukuLoading />
  const { bukuDipinjam, ratioBukuDipinjam, statsBukuPinjam } = data
  
  return (
    <Container className='w-full'>
      <PustakawanBreadCrumbs />
      <GrafikBukuContainer
        judulStatistik='Pertumbuhan Peminjaman Buku Bulanan'
        judulRasio='Rasio Peminjaman Buku'
        dataRasio={ratioBukuDipinjam}
        dataStatistik={statsBukuPinjam}
        labelDataRasio={['Total Buku', 'Buku Dipinjam']}
      />
      <SemuaBukuFilter />
      <ProdiBukuDipinjamTable dataBuku={bukuDipinjam} />
    </Container>
  )
}

export default ProdiSemuaBukuDipinjam