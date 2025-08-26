import Container from '@/globals/Container'
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import InputDataContainer from '@/components/Pustakawan/Buku/TambahBuku/InputDataContainer'
import PustakawanTambahBukuHeader from '@/components/Pustakawan/Buku/TambahBuku/PustakawanTambahBukuHeader'
import { useMutation } from '@tanstack/react-query'
import { tambahBukuPustakawan } from '@/actions/Pustakawan/pustakawanBukuActions'

const PustakawanTambahBuku = () => {

  const mutation = useMutation({
    mutationFn: (data: any) => tambahBukuPustakawan({data})
  })

  const handleSubmit = async(e: any) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    mutation.mutate(data)
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