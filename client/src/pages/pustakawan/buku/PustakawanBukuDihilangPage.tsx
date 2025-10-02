import { getAllBukuDihilangkanPustakawan } from '@/actions/Pustakawan/pustakawanBukuActions'
import Container from '@/globals/Container'
import { useSearchParams, Link } from 'react-router-dom'
import GrafikBukuContainer from '@/components/Pustakawan/Buku/GrafikBukuContainer'
import SemuaBukuFilter from '@/components/Pustakawan/Buku/SemuaBukuFilter'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import { Plus } from 'lucide-react'
import TabelBukuHilang from '@/components/Pustakawan/Buku/BukuDihilangkan/TabelBukuHIlang'
import BukuLoading from '@/components/Pustakawan/Buku/BukuLoading'

const PustakawanBukuDihilangPage = () => {

  const [searchParams] = useSearchParams()
  const query = new URLSearchParams(searchParams).toString()

  const {data, isLoading} = useQuery({
    queryKey: ['buku', 'dihilangkan', query],
    queryFn: () => getAllBukuDihilangkanPustakawan({query})
  })

  if (isLoading) return <BukuLoading />
  const { bukuDihilangkan, ratioBukuDihilangkan, statsBukuDihilangkan } = data

  return (
    <Container className="w-full">
      <section className="w-full flex items-center justify-between">
        <PustakawanBreadCrumbs />
        <Button className="w-fit h-8 rounded border mb-4">
          <Link   to='/' className="flex items-center gap-x-2 text-xs text-white"><Plus className="stroke-white" /> Tambah Buku</Link>
        </Button>
      </section>

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

export default PustakawanBukuDihilangPage