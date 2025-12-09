import Container from "@/globals/Container"
import {
  DetailPengembalianLoading,
  DetailPengembalianContainer,
} from '@/components/pengguna/DetailPengembalian'
import useFetchDetailPengembalianPengguna from "@/hooks/fetchHooks/penggunaHooks/pengembalian/useFetchDetailPengembalianPengguna"

const DetailPengembalianPage = () => {

  const {
    isLoading,
    detailPengembalian, detailPengguna, 
    detailPeminjaman, detailBuku } = useFetchDetailPengembalianPengguna()

  if (isLoading) {
    return (
      <Container className="my-20">
        <DetailPengembalianLoading />
      </Container>
    )
  }

  return (
    <Container className="my-20">
      <DetailPengembalianContainer 
        detailPinjaman={detailPeminjaman} dataDiri={detailPengguna} 
        detailPengembalian={detailPengembalian} detailBuku={detailBuku} />
    </Container>
  )
}

export default DetailPengembalianPage