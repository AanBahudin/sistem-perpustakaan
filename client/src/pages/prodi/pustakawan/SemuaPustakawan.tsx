
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import Container from '@/globals/Container'

import SearchAndFilterPustakawanDataContainer from '@/components/Prodi/Pustakawan/SearchAndFilterPustakawanDataContainer'
import PustakawanDataContainer from '@/components/Prodi/Pustakawan/PustakawanDataContainer'

const SemuaPustakawan = () => {
  return (
    <Container className='w-full'>
      <PustakawanBreadCrumbs />
      <h4 className='mt-10 mb-4 text-2xl font-semibold'>Daftar Pustakawan Aktif</h4>
      <SearchAndFilterPustakawanDataContainer />
      <PustakawanDataContainer />
    </Container>

  )
}

export default SemuaPustakawan