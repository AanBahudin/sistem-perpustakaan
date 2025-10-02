import { useSearchParams } from 'react-router-dom'
import Container from '@/globals/Container'
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import PustakawanPengaturanTabsMenu from '@/components/Pustakawan/Pengaturan/PustakawanPengaturanTabsMenu'
import PustakawanKondisiBukuSection from '@/components/Pustakawan/Pengaturan/PustakawanKondisiBukuSection'
import PustakawanDendaSection from '@/components/Pustakawan/Pengaturan/PustakawanDendaSection'
import PustakawanKategoriSection from '@/components/Pustakawan/Pengaturan/PustakawanKategoriSection'
import PustakawanDurasiSection from '@/components/Pustakawan/Pengaturan/PustakawanDurasiSection'

const PustakawanPengaturanPage = () => {

  const [searchParams] = useSearchParams()
  const currentParams = searchParams.get('menu') || 'Kondisi Buku'

  return (
    <Container className='w-full'>
      <PustakawanBreadCrumbs />
      <PustakawanPengaturanTabsMenu />
      {(currentParams === 'Kondisi Buku' || !currentParams) && <PustakawanKondisiBukuSection />}
      {currentParams === 'Denda' && <PustakawanDendaSection />}
      {currentParams === 'Kategori' && <PustakawanKategoriSection />}
      {currentParams === 'Durasi' && <PustakawanDurasiSection />}
    </Container>
  )
}

export default PustakawanPengaturanPage