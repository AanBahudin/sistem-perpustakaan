import Container from "@/globals/Container"
import { useParams } from "react-router-dom"
import DetailBookContainer from "../../../components/pengguna/DetailBukuPengguna/DetailBookContainer"
import YouMayLIkeBookContainer from "@/components/pengguna/DetailBukuPengguna/YouMayLIkeBookContainer"
import { getPeminjamanByBookId } from "@/actions/peminjamanActions"
import { useQuery } from "@tanstack/react-query"
import DetailBookLoading from "@/components/Loading/DetailBookLoading"

const DetailBuku = () => {
  const {id} = useParams()

  const {data: dataPeminjaman, isLoading} = useQuery({
    queryKey: ['detail-peminjaman', id],
    queryFn: () => getPeminjamanByBookId(id!),
  })


  if (isLoading) return <DetailBookLoading />

  return (
    <Container className="my-20">
        <DetailBookContainer peminjaman={dataPeminjaman} />
        <YouMayLIkeBookContainer />
      
    </Container>
  )
}

export default DetailBuku