import Container from "@/globals/Container"
import DetailPerpanjanganContainer from "@/components/pengguna/DetailPerpanjangan/DetailPerpanjanganContainer"
import DetailPengembalianLoadingPage from "@/components/pengguna/DetailPengembalian/DetailPengembalianLoadingPage"
import useFetchDetailPerpanjanganPengguna from "@/hooks/fetchHooks/penggunaHooks/perpanjangan/useFetchDetailPerpanjanganPengguna"

const DetailPerpanjanganPage = () => {

  const {
    isLoading,
    detailBuku,
    peminjaman,
    perpanjangan,
    profil
  } = useFetchDetailPerpanjanganPengguna()

  if (isLoading) {
    return (
      <Container className="my-20">
        <DetailPengembalianLoadingPage />
      </Container>
    )
  }

  return (
    <Container className="my-20">
      <DetailPerpanjanganContainer peminjaman={peminjaman} detailBuku={detailBuku} detailPerpanjangan={perpanjangan} profil={profil} />
    </Container>
  )
}

export default DetailPerpanjanganPage