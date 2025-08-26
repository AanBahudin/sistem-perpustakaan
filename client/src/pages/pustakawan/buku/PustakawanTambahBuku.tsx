import Container from '@/globals/Container'
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import InputDataContainer from '@/components/Pustakawan/Buku/TambahBuku/InputDataContainer'
import PustakawanTambahBukuHeader from '@/components/Pustakawan/Buku/TambahBuku/PustakawanTambahBukuHeader'

const PustakawanTambahBuku = () => {

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
  }

  return (
    <Container className='w-full'>
      <PustakawanBreadCrumbs />
      <form onSubmit={handleSubmit} encType='multipart/form-data' className="w-full flex flex-col flex-1 space-y-4">
        <PustakawanTambahBukuHeader />
        <InputDataContainer />
      </form>
    </Container>
  )
}
export default PustakawanTambahBuku