import { Badge } from "@/components/ui/badge"
import { BadgeCheckIcon, CircleDotDashed, EllipsisVertical, ShieldX } from "lucide-react"
import SinglePenggunaDropdown from "@/components/Pustakawan/Pengguna/SinglePengguna/SinglePenggunaDropdown"

const MainProfileContainer = ({data}: {data: any}) => {
  return (
    <main className="w-[30%] bg-primary/10 rounded-2xl border min-h-[40vh] flex flex-col items-center justify-center relative">
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
  )
}

export default MainProfileContainer