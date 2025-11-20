import Container from "@/globals/Container"
import { useParams } from "react-router-dom"
import DetailBookContainer from "@/components/pengguna/DetailBukuPengguna/DetailBookContainer"
import YouMayLIkeBookContainer from "@/components/pengguna/DetailBukuPengguna/YouMayLIkeBookContainer"
import { useQuery } from "@tanstack/react-query"
import DetailBookLoading from "@/components/Loading/DetailBookLoading"
import { getDetailBuku } from "@/actions/BukuActions"

const DetailBuku = () => {
  const {id} = useParams()

  const {data: dataBuku, isLoading} = useQuery({
    queryKey: ['detail-book', id],
    queryFn: () => getDetailBuku(id as string),
  })

  if (isLoading) return <DetailBookLoading />

  return (
    <Container className="my-20">
      <DetailBookContainer peminjaman={dataBuku.loan} detailBuku={dataBuku.buku}  />
      <YouMayLIkeBookContainer />
    </Container>
  )
}

export default DetailBuku