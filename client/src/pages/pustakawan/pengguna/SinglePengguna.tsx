import { getSinglePengguna } from "@/actions/Pustakawan/PustakawanGetPenggunaActions"
import ActivityInfoContainer from "@/components/Pustakawan/Pengguna/SinglePengguna/ActivityInfoContainer"
import MainProfileContainer from "@/components/Pustakawan/Pengguna/SinglePengguna/MainProfileContainer"
import PenggunaBreadCrumbs from "@/components/Pustakawan/Pengguna/SinglePengguna/PenggunaBreadCrumbs"
import StatsProfileContainer from "@/components/Pustakawan/Pengguna/SinglePengguna/StatsProfileContainer"
import { Calendar } from "@/components/ui/calendar"
import Container from "@/globals/Container"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

const SinglePengguna = () => {

  const {id: idParams} = useParams()

  const {isLoading, data} = useQuery({
    queryKey: ['single', 'pengguna', idParams],
    queryFn: () => getSinglePengguna(idParams as string)
  })

  if (isLoading) return <h1>Loading ...</h1>
  const {pengguna, peminjaman, perpanjangan, pengembalian} = data

  const ratioData = [
    peminjaman.length || 0,
    perpanjangan.length || 0,
    pengembalian.length || 0
  ]

  return (
    <Container className="w-full">
      <PenggunaBreadCrumbs title={pengguna.nama} />

      <section className="w-full min-h-[40vh] flex justify-start items-start gap-x-4">
        <MainProfileContainer data={pengguna} />
        <StatsProfileContainer nama={pengguna.nama} ratioData={ratioData} />
        <Calendar className="border rounded-xl" />
      </section>

      <ActivityInfoContainer  
        nama={pengguna.nama} 
        peminjaman={peminjaman}
        perpanjangan={perpanjangan}
        pengembalian={pengembalian}
        />
    </Container>
  )
}

export default SinglePengguna