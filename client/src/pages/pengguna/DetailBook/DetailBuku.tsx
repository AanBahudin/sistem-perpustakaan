import Container from "@/globals/Container"
import { useParams } from "react-router-dom"
import DetailBookContainer from "@/components/pengguna/DetailBukuPengguna/DetailBookContainer"
import YouMayLIkeBookContainer from "@/components/pengguna/DetailBukuPengguna/YouMayLIkeBookContainer"
import { getPeminjamanByBookId } from "@/actions/peminjamanActions"
import { useQueries } from "@tanstack/react-query"
import DetailBookLoading from "@/components/Loading/DetailBookLoading"
import { getAllBuku, getDetailBuku } from "@/actions/BukuActions"

const DetailBuku = () => {
  const {id} = useParams()

  const result = useQueries({
    queries: [
      {
        queryKey: ['buku'],
        queryFn: () => getAllBuku(),
      },
      {
        queryKey: ['detail-book', id],
        queryFn: () => getDetailBuku(id as string),
      },
      {
        queryKey: ['detail-peminjaman', id],
        queryFn: () => getPeminjamanByBookId(id!),
      },
    ]
  })

  const [semuaBuku, detailBuku, peminjamanQuery] = result
  const isLoading = result.some(q => q.isLoading)

  if (isLoading) return <DetailBookLoading />

  return (
    <Container className="my-20">
      <DetailBookContainer peminjaman={peminjamanQuery.data} detailBuku={detailBuku.data}  />
      <YouMayLIkeBookContainer dataBuku={semuaBuku.data} />
      
    </Container>
  )
}

export default DetailBuku