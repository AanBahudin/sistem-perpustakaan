import { User } from "lucide-react"
import { formatedDate } from "@/utils/formatDate"
import ProfileDropDown from "./ProfileDropDown"


const PustakawanMainProfile = ({profil} : {profil: any}) => {

  return (
    <section className="w-[30%] min-h-[40vh] p-4 border rounded-xl relative flex flex-col items-center justify-center">
      <ProfileDropDown profil={profil} />      
      <main className="bg-muted w-24 h-24 rounded-full relative">
        
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

export default PustakawanMainProfile