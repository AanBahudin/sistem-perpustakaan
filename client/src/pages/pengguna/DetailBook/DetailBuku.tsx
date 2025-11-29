import Container from "@/globals/Container"
import {YouMayLikeBookContainer, DetailBookContainer, DetailBookLoading} from "@/components/pengguna/DetailBukuPengguna"
import { useFetchDetailBukuPengguna } from "@/hooks/fetchHooks/penggunaHooks/bukuHooks"

const DetailBuku = () => {
  
  const {isLoading, data} = useFetchDetailBukuPengguna()
  if (isLoading) return <DetailBookLoading />

  return (
    <Container className="my-20">
      <DetailBookContainer peminjaman={data.loan} detailBuku={data.buku}  />
      <YouMayLikeBookContainer />
    </Container>
  )
}

export default DetailBuku