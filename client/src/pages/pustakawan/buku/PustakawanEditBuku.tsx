import { editBukuPustakawan, getSingleBukuPustakawan } from '@/actions/Pustakawan/pustakawanBukuActions'
import DetailBukuBreadcrumbs from '@/components/Pustakawan/Buku/DetailBuku/DetailBukuBreadcrumbs'
import InputDataContainerEdit from '@/components/Pustakawan/Buku/EditBuku/InputDataContainerEdit'
import PustakawanEditBukuLoading from '@/components/Pustakawan/Buku/EditBuku/PustakawanEditBukuLoading'
import PustakawanTambahBukuHeaderEdit from '@/components/Pustakawan/Buku/EditBuku/PustakawanTambahBukuHeaderEdit'
import Container from '@/globals/Container'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const PustakawanEditBuku = () => {

  const navigate = useNavigate()
  const {idBuku} = useParams()
  const queryClient = useQueryClient()

  const {data, isLoading} = useQuery({
    queryKey: ['edit', 'buku', idBuku],
    queryFn: () => getSingleBukuPustakawan({idBuku: idBuku as string}) 
  })

  const mutation = useMutation({
    mutationFn: (data: FormData) => editBukuPustakawan(data, idBuku as string),
    onSuccess: () => {
      toast('Berhasil Ditambahkan', {description: 'Buku berhasil diupdate!'})
      queryClient.invalidateQueries({queryKey: ['detail', 'buku', idBuku]})
      navigate(`/pustakawan/buku/detail/${idBuku}`)
    },
    onError: () => {
      toast('Terjadi kesalahan', {description: 'Tidak dapat update buku'})
    }
  })

  const handleSubmit = async(e: any) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    mutation.mutate(formData)
  }

  useEffect(() => {
    if (!idBuku) {
      navigate(-1)
    }
  }, [idBuku])

  if (isLoading) return <PustakawanEditBukuLoading />

  return (
    <Container className='w-full'>
      <DetailBukuBreadcrumbs text={data.buku.judul} />
      <form onSubmit={handleSubmit} encType='multipart/form-data' className='w-full flex flex-col space-y-4'>
        <PustakawanTambahBukuHeaderEdit isLoading={mutation.isPending} />
        <InputDataContainerEdit data={data.buku} />
      </form>
    </Container>
  )
}

export default PustakawanEditBuku