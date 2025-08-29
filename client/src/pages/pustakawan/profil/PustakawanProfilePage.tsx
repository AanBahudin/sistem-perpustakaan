import { getProfilePustakawan } from "@/actions/Pustakawan/pustakawanProfileActions"
import PustakawanBreadCrumbs from "@/components/Pustakawan/PustakawanBreadCrumbs"
import Container from "@/globals/Container"
import GlobalTooltip from "@/globals/GlobalTooltip"
import { formatedDate } from "@/utils/formatDate"
import { useQuery } from "@tanstack/react-query"
import { EllipsisVertical, Info, Pen, User } from "lucide-react"

const PustakawanProfilePage = () => {

  const {isLoading, data} = useQuery({
    queryKey: ['pustakawan', 'profil'],
    queryFn: getProfilePustakawan
  })

  if (isLoading) return <h1>Loading...</h1>
  console.log(data)

  return (
    <Container className="w-full ">
      <PustakawanBreadCrumbs />
      <PustakawanMainProfileContainer data={data} />

    </Container>
  )
}


const PustakawanMainProfileContainer = ({data} : {data: any}) => {
  return (
    <section className="w-full flex items-start justify-start gap-x-6 my-6">
      <PustakawanMainProfile profil={data.profile} />
      <PustakawanDetailStats data={data} />
    </section>
  )
}

const PustakawanMainProfile = ({profil} : {profil: any}) => {

  return (
    <section className="w-[30%] min-h-[40vh] p-4 border rounded-xl relative flex flex-col items-center justify-center">
      <main className="w-8 absolute h-8 rounded-full hover:bg-accent/40 p-2 flex items-center justify-center top-4 right-4">
        <EllipsisVertical className="stroke-white" />
      </main>

      <main className="bg-muted w-24 h-24 rounded-full relative">

        <GlobalTooltip text="Edit Profil">
          <div className="w-8 h-8 absolute p-2 bg-primary flex items-center justify-center rounded-full bottom-0 right-0">
            <Pen   />
          </div>
        </GlobalTooltip>

        {profil?.fotoProfil ? (
          <img className="w-full h-full rounded-full object-cover" src={profil.fotoProfile} alt={profil.nama} />
        ) : (
          <div className="w-full h-full rounded-full flex items-center justify-center">
            <User className="stroke-muted-foreground w-18 h-18 stroke-1" />
          </div>
        )}

      </main>

      <h2 className="mt-4">{profil.nama}</h2>
      <h2 className="text-muted-foreground text-xs">{profil.email}</h2>
      <h5 className="my-4 text-xs text-white bg-primary py-0.5 px-2 rounded">Bergabung Sejak {formatedDate(profil.createdAt)}</h5>


    </section>
  )
}

const PustakawanDetailStats = ({data}: {data: any}) => {
  const { dataValue, profile } = data

  const titles: string[] = ['Buku Diproses', 'Peminjaman Diproses', 'Perpanjangan Diproses', 'Pengembalian Diproses']

  return (
    <section className="flex-1 p-4 border rounded-xl min-h-[40vh]">

      <h1 className="mb-4 font-bold text-2xl ">Statistik {profile.nama}</h1>

      <main className="w-full flex items-center justify-center gap-x-4">
        {dataValue.map((item: number, index: number) => {
          return (
            <div key={index} className="flex-1  flex flex-col items-center justify-between p-2 bg-primary/20 min-h-[15vh] border rounded-xl">
              <div className="flex-1 flex items-center justify-center">
                <h1 className="text-6xl w-full text-center font-extrabold">{item}</h1>
              </div>
              <h2 className="text-xs h-fit font-normal text-center">{titles[index]}</h2>
            </div>
          )
        })}
      </main>

      {/* <Separator className="w-full my-2" /> */}

      <main className="w-full mt-4">
        <div className="w-fit flex gap-x-3 items-center text-md font-bold mb-2">
          <Info className="w-5 h-5" />
          <p>Detail Informasi</p>
        </div>

        <div className="w-full flex flex-wrap gap-8">
          <div className="w-fit flex flex-col items-start gap-1 justify-start">
            <h4 className="text-sm text-muted-foreground">Status Akun Pustakawan</h4>
            <p className="text-xs min-w-[100px] text-center py-0.5 rounded bg-muted mt px-2">{profile.statusAkun}</p>
          </div>

          <div className="flex-1 w-fit flex flex-col items-start gap-1 justify-start">
            <h4 className="text-sm text-muted-foreground">Nomor Telepon</h4>
            <p className="text-xs min-w-[100px] text-center py-0.5 rounded bg-muted mt px-2">{profile.no_hp || 'Tidak disertakan'}</p>
          </div>
        </div>
      </main>
    </section>
  )
}

export default PustakawanProfilePage