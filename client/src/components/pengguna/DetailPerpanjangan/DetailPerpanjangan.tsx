import { useQuery } from "@tanstack/react-query"
import DetailColumn from "./DetailColumn"
import { useParams } from "react-router-dom"
import { getDetailPeminjaman } from "@/actions/peminjamanActions"
import PerpanjanganColumn from "./PerpanjanganColumn"

type DetailPerpanjanganType = {
    detailPerpanjangan: any,
    detailBuku: any,
    profil: any
}

const DetailPerpanjangan = ({detailBuku, detailPerpanjangan, profil} : DetailPerpanjanganType) => {

  const {id} = useParams()

  const {idPeminjaman} = detailPerpanjangan
  const {data, isLoading} = useQuery({
    queryKey: ['detail-peminjaman', 'perpanjangan', id],
    queryFn: () => getDetailPeminjaman(idPeminjaman)
  })


  return (
    <section className='w-full grid grid-cols-12 gap-x-4 mt-10'>
      {isLoading ? <h1>Loading</h1> : (
        <>
          <DetailColumn detailBuku={detailBuku} profil={profil} peminjaman={data}/>
          <PerpanjanganColumn peminjaman={data} perpanjangan={detailPerpanjangan} />
        </>
      )}
    </section>
  )
}

export default DetailPerpanjangan