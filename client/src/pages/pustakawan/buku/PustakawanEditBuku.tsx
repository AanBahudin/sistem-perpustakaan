import DetailBukuBreadcrumbs from '@/components/Pustakawan/Buku/DetailBuku/DetailBukuBreadcrumbs'
import InputDataContainerEdit from '@/components/Pustakawan/Buku/EditBuku/InputDataContainerEdit'
import PustakawanEditBukuLoading from '@/components/Pustakawan/Buku/EditBuku/PustakawanEditBukuLoading'
import PustakawanTambahBukuHeaderEdit from '@/components/Pustakawan/Buku/EditBuku/PustakawanTambahBukuHeaderEdit'
import Container from '@/globals/Container'
import { useEditBukuPustakawan } from '@/hooks/fetchHooks/pustakawanHooks/bukuHooks'

const PustakawanEditBuku = () => {

  const {dataBuku, mutationLoading, queryLoading, submitFn} = useEditBukuPustakawan()
  if (queryLoading) return <PustakawanEditBukuLoading />

  return (
    <Container className='w-full'>
      <DetailBukuBreadcrumbs text={dataBuku.buku.judul} />
      <form onSubmit={submitFn} encType='multipart/form-data' className='w-full flex flex-col space-y-4'>
        <PustakawanTambahBukuHeaderEdit isLoading={mutationLoading} />
        <InputDataContainerEdit data={dataBuku.buku} />
      </form>
    </Container>
  )
}

export default PustakawanEditBuku