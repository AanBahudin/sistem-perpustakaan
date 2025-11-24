import Container from '@/globals/Container'
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import InputDataContainer from '@/components/Pustakawan/Buku/TambahBuku/InputDataContainer'
import PustakawanTambahBukuHeader from '@/components/Pustakawan/Buku/TambahBuku/PustakawanTambahBukuHeader'
import { useMutation } from '@tanstack/react-query'
import { pustakawanCreateBukuAction } from '@/actions/Pustakawan/Buku'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const PustakawanTambahBuku = () => {

  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: (data: any) => pustakawanCreateBukuAction({data}),
    onSuccess: () => {
      toast('Berhasil Ditambahkan', {description: 'Buku berhasil ditambahkan!'})
      navigate('/pustakawan/buku')
    },
    onError: () => {
      toast('Terjadi kesalahan', {description: 'Tidak dapat menambahkan buku'})
    }
  })

  const handleSubmit = async(e: any) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const objectData = Object.fromEntries(formData)
    mutation.mutate(objectData)
  }

  return (
    <Container className='w-full'>
      <PustakawanBreadCrumbs />
      <form onSubmit={handleSubmit} encType='multipart/form-data' className="w-full flex flex-col flex-1 space-y-4">
        <PustakawanTambahBukuHeader isLoading={mutation.isPending} />
        <InputDataContainer />
      </form>
    </Container>
  )
}
export default PustakawanTambahBuku