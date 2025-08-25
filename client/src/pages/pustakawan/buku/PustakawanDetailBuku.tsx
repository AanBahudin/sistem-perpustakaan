import Container from '@/globals/Container'
import DetailBukuBreadcrumbs from '@/components/Pustakawan/Buku/DetailBuku/DetailBukuBreadcrumbs'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getSingleBukuPustakawan } from '@/actions/Pustakawan/pustakawanBukuActions'
import DetailBukuTabs from '@/components/Pustakawan/Buku/DetailBuku/DetailBukuTabs'
import { useSelector } from 'react-redux'
import GeneralInfoContainer from '@/components/Pustakawan/Buku/DetailBuku/GeneralInfoContainer'

const PustakawanDetailBuku = () => {

  const { idBuku } = useParams()

  const {data, isLoading} = useQuery({
    queryKey: ['detail', 'buku', idBuku],
    queryFn: () => getSingleBukuPustakawan({idBuku: idBuku as string})
  })

  const { pustakawanDetailBukuTabs: isActive } = useSelector((state: any) => state.detailBukuState)

  if (isLoading) return <h1>Loading....</h1>

  return (
    <Container className='w-full'>
      <DetailBukuBreadcrumbs text={data.judul} />
      <DetailBukuTabs />

      {isActive === 'Umum' ? (
        <GeneralInfoContainer data={data} />
      ) : (
        <h1>Test</h1>
      )}
      
    </Container>
  )
}

export default PustakawanDetailBuku