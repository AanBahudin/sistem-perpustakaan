import Container from "@/globals/Container"
import DetailBookContainer from "@/components/pengguna/DetailBukuPengguna/DetailBookContainer"
import YouMayLIkeBookContainer from "@/components/pengguna/DetailBukuPengguna/YouMayLIkeBookContainer"
import DetailBookLoading from "@/components/Loading/DetailBookLoading"
import { useFetchDetailBukuPengguna } from "@/hooks/fetchHooks/penggunaHooks/bukuHooks"

const DetailBuku = () => {
  
  const {isLoading, data} = useFetchDetailBukuPengguna()
  if (isLoading) return <DetailBookLoading />

  return (
    <Container className="my-20">
      <DetailBookContainer peminjaman={data.loan} detailBuku={data.buku}  />
      <YouMayLIkeBookContainer />
    </Container>
  )
}

export default DetailBuku