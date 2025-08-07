import { getSinglePengguna } from "@/actions/Pustakawan/PustakawanGetPenggunaActions"
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
  
  return (
    <Container className="w-full">
      <PenggunaBreadCrumbs title={data.nama} />

      <section className="w-full min-h-[40vh] flex justify-start items-start gap-x-4">
        <MainProfileContainer data={data} />
        <StatsProfileContainer nama={data.nama} />
        <Calendar className="border rounded-xl" />
      </section>

      <section className="w-full">
        <section className="w-[70%] min-h-[35vh] border rounded-2xl ">
          
        </section>
      </section>
    </Container>
  )
}

export default SinglePengguna