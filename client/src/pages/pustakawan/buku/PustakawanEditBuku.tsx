import { getSingleBukuPustakawan } from '@/actions/Pustakawan/pustakawanBukuActions'
import DetailBukuBreadcrumbs from '@/components/Pustakawan/Buku/DetailBuku/DetailBukuBreadcrumbs'
import InputDataContainerEdit from '@/components/Pustakawan/Buku/EditBuku/InputDataContainerEdit'
import PustakawanTambahBukuHeaderEdit from '@/components/Pustakawan/Buku/EditBuku/PustakawanTambahBukuHeaderEdit'
import Container from '@/globals/Container'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const PustakawanEditBuku = () => {

  const navigate = useNavigate()
  const {idBuku} = useParams()

  const {data, isLoading} = useQuery({
    queryKey: ['edit', 'buku', idBuku],
    queryFn: () => getSingleBukuPustakawan({idBuku: idBuku as string}) 
  })

  const mutation = useMutation({})

  useEffect(() => {
    if (!idBuku) {
      navigate(-1)
    }
  }, [idBuku])

  if (isLoading) return <h1>Loading...</h1>

  return (
    <Container className='w-full'>
      <DetailBukuBreadcrumbs text={data.buku.judul} />
      <form action="" className='w-full flex flex-col space-y-4'>
        <PustakawanTambahBukuHeaderEdit isLoading={mutation.isPending} />
        <InputDataContainerEdit data={data.buku} />
      </form>
    </Container>
  )
}

export default PustakawanEditBuku