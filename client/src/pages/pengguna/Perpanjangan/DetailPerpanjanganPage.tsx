import Container from "@/globals/Container"
import DetailPerpanjanganContainer from "@/components/pengguna/DetailPerpanjangan/DetailPerpanjanganContainer"
import DetailPengembalianLoadingPage from "@/components/Loading/DetailPengembalianLoadingPage"
import useFetchDetailPerpanjanganPengguna from "@/hooks/fetchHooks/penggunaHooks/perpanjangan/useFetchDetailPerpanjanganPengguna"

const DetailPerpanjanganPage = () => {

  const {
    isLoading,
    detailBuku,
    peminjaman,
    perpanjangan,
    profil
  } = useFetchDetailPerpanjanganPengguna()

  return (
    <Container className="my-20">
      {isLoading ? <DetailPengembalianLoadingPage /> : <DetailPerpanjanganContainer peminjaman={peminjaman} detailBuku={detailBuku} detailPerpanjangan={perpanjangan} profil={profil} />}
    </Container>
  )
}

export default DetailPerpanjanganPage