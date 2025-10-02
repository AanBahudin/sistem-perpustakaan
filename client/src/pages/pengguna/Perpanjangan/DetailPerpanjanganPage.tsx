import Container from "@/globals/Container"
import { useQueries } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getDetailBuku } from "@/actions/BukuActions"
import { getPerpanjanganDetail } from "@/actions/perpanjanganActions"
import DetailPerpanjanganContainer from "@/components/pengguna/DetailPerpanjangan/DetailPerpanjanganContainer"
import { profileAction } from "@/actions/userActions"
import DetailPengembalianLoadingPage from "@/components/Loading/DetailPengembalianLoadingPage"

const DetailPerpanjanganPage = () => {

  const {id, idBuku} = useParams()

  const results = useQueries({
    queries: [
      {
        queryKey: ['detail-perpanjangan', id],
        queryFn: () => getPerpanjanganDetail(id as string)
      },
      {
        queryKey: ['detail-book', idBuku],
        queryFn: () => getDetailBuku(idBuku!)
      },
      {
        queryKey: ['profil'],
        queryFn: () => profileAction()
      }
    ]
  })

  const [detailPerpanjangan, detailBuku, profil] = results
  const isLoading = results.some(q => q.isLoading)

  return (
    <Container className="my-20">
      {isLoading ? <DetailPengembalianLoadingPage /> : <DetailPerpanjanganContainer detailBuku={detailBuku.data} detailPerpanjangan={detailPerpanjangan.data} profil={profil.data} />}
    </Container>
  )
}

export default DetailPerpanjanganPage