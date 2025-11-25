import Container from '@/globals/Container'
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import InputDataContainer from '@/components/Pustakawan/Buku/TambahBuku/InputDataContainer'
import PustakawanTambahBukuHeader from '@/components/Pustakawan/Buku/TambahBuku/PustakawanTambahBukuHeader'
import { usePustakawanCreateBuku } from '@/hooks/fetchHooks/pustakawanHooks/bukuHooks'


const PustakawanTambahBuku = () => {

  const {isLoading, submitFn} = usePustakawanCreateBuku()

  return (
    <Container className='w-full'>
      <PustakawanBreadCrumbs />
      <form onSubmit={submitFn} encType='multipart/form-data' className="w-full flex flex-col flex-1 space-y-4">
        <PustakawanTambahBukuHeader isLoading={isLoading} />
        <InputDataContainer />
      </form>
    </Container>
  )
}
export default PustakawanTambahBuku