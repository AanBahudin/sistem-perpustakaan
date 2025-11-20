import Container from '@/globals/Container'
import DetailPeminjamanContainer from '@/components/pengguna/Detail Peminjaman/DetailPeminjamanContainer'
import DetailBookLoading from '@/components/Loading/DetailBookLoading'
import useFetchDetailPeminjamanUser from '@/hooks/fetchHooks/penggunaHooks/peminjaman/useFetchDetailPeminjamanUser'

const PeminjamanDetailPage = () => {

  const { isLoading, detailBuku, detailPeminjaman } = useFetchDetailPeminjamanUser()
  return (
    <Container className='my-20 mx-auto'>
      {isLoading ? <DetailBookLoading /> : (
        <DetailPeminjamanContainer
          detailBuku={detailBuku}
          peminjaman={detailPeminjaman} />
      )}
    </Container>
  )
}

export default PeminjamanDetailPage