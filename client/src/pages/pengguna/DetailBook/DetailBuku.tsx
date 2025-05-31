import { getAllBuku, getDetailBuku } from "@/actions/BukuActions"
import { getAllSimpanan } from "@/actions/simpanActions"
import { getAllSuka } from "@/actions/sukaActions"
import BookLoading from "@/components/Loading/BookLoading"
import Container from "@/globals/Container"
import { useParams } from "react-router-dom"
import DetailBookContainer from "../../../components/pengguna/DetailBukuPengguna/DetailBookContainer"
import YouMayLIkeBookContainer from "@/components/pengguna/DetailBukuPengguna/YouMayLIkeBookContainer"
import { getPeminjamanByBookId } from "@/actions/peminjamanActions"
import { useQueries } from "@tanstack/react-query"

const DetailBuku = () => {
  const {id} = useParams()

  const results = useQueries({
    queries: [
      {
      queryKey: ['detail-book', id],
      queryFn: () => getDetailBuku(id!),
    },
    {
      queryKey: ['detail-peminjaman', id],
      queryFn: () => getPeminjamanByBookId(id!),
    },
    {
      queryKey: ['simpan'],
      queryFn: getAllSimpanan,
    },
    {
      queryKey: ['suka'],
      queryFn: getAllSuka,
    },
    {
      queryKey: ['buku'],
      queryFn: () => getAllBuku(),
    }
    ]
  })

  const [
    detailBukuQuery,
    peminjamanQuery,
    disimpanQuery,
    disukaiQuery,
    semuaBukuQuery,
  ] = results

  const isLoading = results.some(q => q.isLoading)

  if (isLoading) return <BookLoading />

  const {data: dataDetailBuku} = detailBukuQuery
  const {data: dataPeminjaman} = peminjamanQuery
  const {data: dataSimpanan} = disimpanQuery
  const {data: dataDisukai} = disukaiQuery
  const {data: dataSemuaBuku} = semuaBukuQuery

  return (
    <Container className="my-20">
        <DetailBookContainer 
          bookData={dataDetailBuku}
          savedData={dataSimpanan.bukuDisimpan} 
          likedData={dataDisukai.bukuDisukai}
          peminjaman={dataPeminjaman} />

        <YouMayLIkeBookContainer
          saved={dataSimpanan.bukuDisimpan} 
          liked={dataDisukai}
          books={dataSemuaBuku.data} />
      
    </Container>
  )
}

export default DetailBuku