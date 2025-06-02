import { getDetailBuku } from "@/actions/BukuActions"
import { getDetailPeminjaman, getPeminjamanData } from "@/actions/peminjamanActions"
import { getDetailPengembalianData } from "@/actions/pengembalianActions"
import { getPerpanjangan } from "@/actions/perpanjanganActions"
import { profileAction } from "@/actions/userActions"
import DetailPengembalianContainer from "@/components/pengguna/DetailPengembalian/DetailPengembalianContainer"
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
      // {
      //   queryKey:['pengembalian', id],
      //   queryFn: () => getDetailPengembalianData('')
      // },
      // {
      //   queryKey: ['peminjaman', ''],
      //   queryFn: () =>  getPeminjamanData(`idPeminjaman${id}`)
      // },
      // {
      //   queryKey: ['detail-peminjaman', id],
      //   queryFn: () => getDetailPeminjaman(id!)
      // },
      {
        queryKey: ['detail-book', idBuku],
        queryFn: () => getDetailBuku(idBuku!)
      },
      // {
      //   queryKey: ['perpanjangan', id],
      //   queryFn: () => getPerpanjangan(`idPeminjaman=${id}`)
      // }
    ]
  })


  const [detailPengembalian, dataDiri, detailBuku] = results
  const isLoading = results.some(q => q.isLoading)

  return (
    <Container className="my-20">
      {isLoading ? <h1>Loading</h1> : <DetailPengembalianContainer dataDiri={dataDiri.data} detailPengembalian={detailPengembalian.data} detailBuku={detailBuku.data} />}
    </Container>
  )
}

export default DetailPengembalian