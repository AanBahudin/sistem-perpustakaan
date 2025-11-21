import DetailPengembalianLoadingPage from "@/components/Loading/DetailPengembalianLoadingPage"
import DetailPengembalianContainer from "@/components/pengguna/Detail Pengembalian/DetailPengembalianContainer"
import Container from "@/globals/Container"
import useFetchDetailPengembalianPengguna from "@/hooks/fetchHooks/penggunaHooks/pengembalian/useFetchDetailPengembalianPengguna"

const DetailPengembalianPage = () => {

  const {
    isLoading,
    detailPengembalian, detailPengguna, 
    detailPeminjaman, detailBuku } = useFetchDetailPengembalianPengguna()

  if (isLoading) {
    return (
      <Container className="my-20">
        <DetailPengembalianLoadingPage />
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