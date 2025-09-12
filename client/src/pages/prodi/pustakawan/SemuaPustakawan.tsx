
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import Container from '@/globals/Container'

import SearchAndFilterPustakawanDataContainer from '@/components/Prodi/Pustakawan/SearchAndFilterPustakawanDataContainer'
import PustakawanDataContainer from '@/components/Prodi/Pustakawan/PustakawanDataContainer'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const SemuaPustakawan = () => {
  return (
    <Container className='w-full'>
      <section className='flex items-center justify-between'>
        <PustakawanBreadCrumbs />
        <Button className='flex items-center gap-x-2 text-xs mb-4'>
          <Plus />
          <p>Tambah Pustakawan</p>
        </Button>  
      </section>
      <h4 className='mt-10 mb-4 text-2xl font-semibold'>Daftar Pustakawan Aktif</h4>
      <SearchAndFilterPustakawanDataContainer />
      <PustakawanDataContainer />
    </Container>

  )
}

export default SemuaPustakawan