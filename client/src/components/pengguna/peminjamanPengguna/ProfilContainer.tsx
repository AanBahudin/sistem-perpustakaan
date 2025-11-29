import { Pen } from "lucide-react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { penggunaGetProfileAction } from "@/actions/Pengguna/Profil"
import { Skeleton } from "@/components/ui/skeleton"

const ProfilContainer = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['pengguna', 'profil'],
    queryFn: penggunaGetProfileAction
  })

  return (
    <div className="flex gap-x-4 w-full items-center">
        {isLoading ? (
          <Skeleton className="w-12 h-12 rounded-full" />
        )  : (
          data.fotoProfil ? (
            <img className="w-14 h-14 rounded-full object-cover" src={data.fotoProfil} alt='foto' />
          ) : (
            <div className="w-14 h-14 rounded-full bg-muted"></div>
          )
        )}
        <main>
            <h2 className={`font-semibold ${isLoading ? 'italic' : ''}`}>
              {isLoading ? 'Memuat' : data.nama}
            </h2>
            <div className="flex gap-x-2 items-center mt-1">
                <Pen className="stroke-muted-foreground" size={12} />
                <Link to='/my/profil' className="text-sm text-muted-foreground hover:underline">Ubah profil</Link>
            </div>
        </main>
    </div>
  )
}

export default ProfilContainer