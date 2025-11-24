import { getAllBukuDipinjamPustakawan } from '@/actions/Pustakawan/Buku/pustakawanBukuActions'
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import Container from '@/globals/Container'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import GrafikBukuContainer from '@/components/Pustakawan/Buku/GrafikBukuContainer'
import SemuaBukuFilter from '@/components/Pustakawan/Buku/SemuaBukuFilter'
import TabelBukuDipinjam from '@/components/Pustakawan/Buku/BukuDipinjam/TabelBukuDipinjam'
import BukuLoading from '@/components/Pustakawan/Buku/BukuLoading'

const PustakawanBukuDipinjamPage = () => {

  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const {isLoading, data} = useQuery({
    queryKey: ['buku', 'dipinjam', params],
    queryFn: () => getAllBukuDipinjamPustakawan({query : params})
  })


  if (isLoading) return <BukuLoading />
  const { bukuDipinjam, ratioBukuDipinjam, statsBukuPinjam } = data

  return (
    <Container className='w-full'>
      <section className="w-full flex items-center justify-between">
        <PustakawanBreadCrumbs />
        <Button className="w-fit h-8 rounded border mb-4">
          <Link to='/' className="flex items-center gap-x-2 text-xs text-white"><Plus className="stroke-white" /> Tambah Buku</Link>
        </Button>
      </section>
      <GrafikBukuContainer
        judulStatistik='Pertumbuhan Peminjaman Buku Bulanan'
        judulRasio='Rasio Peminjaman Buku'
        dataRasio={ratioBukuDipinjam}
        dataStatistik={statsBukuPinjam}
        labelDataRasio={['Total Buku', 'Buku Dipinjam']}
      />
      <SemuaBukuFilter />
      <TabelBukuDipinjam dataBuku={bukuDipinjam} />
    </Container>
  )
}

export default PustakawanBukuDipinjamPage