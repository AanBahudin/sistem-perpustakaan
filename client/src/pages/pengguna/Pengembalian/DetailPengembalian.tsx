import { getDetailBuku } from "@/actions/BukuActions"
import { getPeminjamanByPengembalianId } from "@/actions/peminjamanActions"
import { getDetailPengembalianData } from "@/actions/pengembalianActions"
import { profileAction } from "@/actions/userActions"
import DetailPengembalianLoadingPage from "@/components/Loading/DetailPengembalianLoadingPage"
import DetailPengembalianContainer from "@/components/pengguna/Detail Pengembalian/DetailPengembalianContainer"
import Container from "@/globals/Container"
import { useQueries } from "@tanstack/react-query"
import { useParams } from "react-router-dom"


const DetailPengembalian = () => {

  const {id, idBuku} = useParams()

  const results = useQueries({
    queries: [
      {
        queryKey:['detail-pengembalian', id],
        queryFn: () => getDetailPengembalianData(id!)
      },
      {
        queryKey: ['profil'],
        queryFn: () => profileAction()
      },
      {
        queryKey: ['detail-peminjaman', 'pengembalian', id],
        queryFn: () => getPeminjamanByPengembalianId(id!)
      },
      {
        queryKey: ['detail-book', idBuku],
        queryFn: () => getDetailBuku(idBuku!)
      }
    ]
  })


  const [detailPengembalian, dataDiri, detailPeminjaman, detailBuku] = results
  const isLoading = results.some(q => q.isLoading)

  return (
    <Container className="my-20">
      {isLoading ? <DetailPengembalianLoadingPage /> : <DetailPengembalianContainer detailPinjaman={detailPeminjaman.data} dataDiri={dataDiri.data} detailPengembalian={detailPengembalian.data} detailBuku={detailBuku.data} />}
    </Container>
  )
}

export default DetailPengembalian