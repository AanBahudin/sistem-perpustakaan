import { getSinglePengguna } from "@/actions/Pustakawan/PustakawanGetPenggunaActions"
import PenggunaBreadCrumbs from "@/components/Pustakawan/Pengguna/PenggunaBreadCrumbs"
import { Calendar } from "@/components/ui/calendar"
import Container from "@/globals/Container"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { BadgeCheckIcon, CircleDotDashed, EllipsisVertical, ShieldX } from "lucide-react"
import SinglePenggunaDropdown from "@/components/Pustakawan/Pengguna/SinglePenggunaDropdown"

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


        <main className="w-[30%] rounded-2xl border min-h-[40vh] flex flex-col items-center justify-center relative">
          <SinglePenggunaDropdown>
            <main className="absolute p-2 rounded-full hover:bg-muted duration-300 ease-in-out top-3 right-3">
              <EllipsisVertical className="w-3 h-3" />
            </main>
          </SinglePenggunaDropdown>
          {!data.fotoProfil ? (
            <div className="w-20 h-20 text-muted-foreground text-3xl font-semibold rounded-full object-cover border flex items-center justify-center">{data.nama[0]}</div>
          ) : (
            <img className="w-32 h-32 rounded-full object-cover" src={data.fotoProfil} alt={data.nama} />
          )}
          <h1 className="capitalize text-muted-foreground mt-4">{data.nama} | {data.role}</h1>
          <h5 className="text-xs text-muted-foreground">{data.email}</h5>

          <div className="w-full flex items-center justify-center gap-x-4">
            <Badge variant="secondary" className={`${data.statusAkun === 'Aktif' ? 'bg-primary' : (data.statusAkun === 'Pending' ? 'bg-yellow-400' : 'bg-destructive')} text-white mt-4`}>
              {data.statusAkun === 'Aktif' ? <BadgeCheckIcon /> : (data.statusAkun === 'Pending' ? <CircleDotDashed /> : <ShieldX />)}
              {data.statusAkun}
            </Badge>
            {data.blocked && (
              <Badge variant="secondary" className={`bg-destructive text-white mt-4`}>
                <ShieldX />
                Diblokir
              </Badge>
            )}
          </div>
        </main>
        <main className="flex-1 border rounded-2xl min-h-[40vh]">

        </main>

        <Calendar className="border rounded-xl" />
      </section>
    </Container>
  )
}

export default SinglePengguna