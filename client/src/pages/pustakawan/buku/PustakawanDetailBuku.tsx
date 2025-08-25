import Container from '@/globals/Container'
import DetailBukuBreadcrumbs from '@/components/Pustakawan/Buku/DetailBuku/DetailBukuBreadcrumbs'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getSingleBukuPustakawan } from '@/actions/Pustakawan/pustakawanBukuActions'
import DetailBukuTabs from '@/components/Pustakawan/Buku/DetailBuku/DetailBukuTabs'
import { useSelector } from 'react-redux'
import GeneralInfoContainer from '@/components/Pustakawan/Buku/DetailBuku/GeneralInfoContainer'
import StatistikPeminjamanDetailBuku from '@/components/Pustakawan/Buku/DetailBuku/StatsPeminjamanDetailBuku'
import StatistikHilangDetailBuku from '@/components/Pustakawan/Buku/DetailBuku/StatistikHilangDetailBuku'
import StatistikPengembalianDetailBuku from '@/components/Pustakawan/Buku/DetailBuku/StatistikPengembalianDetailBuku'

const PustakawanDetailBuku = () => {

  const { idBuku } = useParams()

  const {data, isLoading} = useQuery({
    queryKey: ['detail', 'buku', idBuku],
    queryFn: () => getSingleBukuPustakawan({idBuku: idBuku as string})
  })

  const { pustakawanDetailBukuTabs: isActive } = useSelector((state: any) => state.detailBukuState)
  if (isLoading) return <h1>Loading....</h1>

  return (
    <Container className='w-full'>
      <DetailBukuBreadcrumbs text={data.buku.judul} />
      <DetailBukuTabs />

      {isActive === 'Umum' && <GeneralInfoContainer data={data.buku} />}     
      {isActive === 'Peminjaman' && <StatistikPeminjamanDetailBuku data={data} />}   
      {isActive === 'Riwayat Pengembalian' && <StatistikPengembalianDetailBuku data={data} />}
      {isActive === 'Riwayat Hilang' && <StatistikHilangDetailBuku data={data} />}
    </Container>
  )
}

export default PustakawanDetailBuku