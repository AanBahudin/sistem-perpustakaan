import Container from '@/globals/Container'
import DetailBukuBreadcrumbs from '@/components/Pustakawan/Buku/DetailBuku/DetailBukuBreadcrumbs'
import DetailBukuTabs from '@/components/Pustakawan/Buku/DetailBuku/DetailBukuTabs'
import { useSelector } from 'react-redux'
import GeneralInfoContainer from '@/components/Pustakawan/Buku/DetailBuku/GeneralInfoContainer'
import StatistikPeminjamanDetailBuku from '@/components/Pustakawan/Buku/DetailBuku/StatsPeminjamanDetailBuku'
import StatistikHilangDetailBuku from '@/components/Pustakawan/Buku/DetailBuku/StatistikHilangDetailBuku'
import StatistikPengembalianDetailBuku from '@/components/Pustakawan/Buku/DetailBuku/StatistikPengembalianDetailBuku'
import DetailBukuDropdownMenu from '@/components/Pustakawan/Buku/DetailBuku/DetailBukuDropdownMenu'
import PustakawanDetailBukuLoading from '@/components/Pustakawan/Buku/DetailBuku/PustakawanDetailBukuLoading'
import { useGetDetailBukuPustakawan } from '@/hooks/fetchHooks/pustakawanHooks/bukuHooks'

const PustakawanDetailBuku = () => {

  const {isLoading, data} = useGetDetailBukuPustakawan()
  const { pustakawanDetailBukuTabs: isActive } = useSelector((state: any) => state.detailBukuState)
  if (isLoading) return <PustakawanDetailBukuLoading />

  return (
    <Container className='w-full'>
      <section className='w-full flex items-center justify-between'>
        <DetailBukuBreadcrumbs text={data.buku.judul} />
        <DetailBukuDropdownMenu idBuku={data.buku._id} />
      </section>
      <DetailBukuTabs />

      {isActive === 'Umum' && <GeneralInfoContainer data={data.buku} />}     
      {isActive === 'Peminjaman' && <StatistikPeminjamanDetailBuku data={data} />}   
      {isActive === 'Riwayat Pengembalian' && <StatistikPengembalianDetailBuku data={data} />}
      {isActive === 'Riwayat Hilang' && <StatistikHilangDetailBuku data={data} />}
    </Container>
  )
}

export default PustakawanDetailBuku