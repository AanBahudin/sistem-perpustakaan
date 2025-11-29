import {DetailPeminjamanContainer} from '@/components/pengguna/DetailPeminjaman'
import {useFetchDetailPeminjamanPengguna} from '@/hooks/fetchHooks/penggunaHooks/peminjaman'
import Container from '@/globals/Container'
import DetailBookLoading from '@/components/pengguna/DetailBukuPengguna/DetailBookLoading'

const PeminjamanDetailPage = () => {

  const { isLoading, detailBuku, detailPeminjaman } = useFetchDetailPeminjamanPengguna()
  
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