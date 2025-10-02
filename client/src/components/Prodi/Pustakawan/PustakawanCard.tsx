import { formatedDate } from "@/utils/formatDate"
import { Link } from "react-router-dom"
import ProdiPustakawanDropdownMenu from "./ProdiPustakawanDropdownMenu"
import { StatusAkunBadge } from "@/components/Pustakawan/Pengguna/SemuaPengguna/TableSemuaPengguna"

const PustakawanCard = ({pustakawan} : {pustakawan: any}) => {
  return (
    <section className='w-full border rounded-xl px-4 py-8 flex flex-col items-center justify-center relative hover:shadow-2xl duration-200 ease-in-out group'>
      
      <ProdiPustakawanDropdownMenu pustakawan={pustakawan} />

      {pustakawan.fotoProfil ? (
        <img src={pustakawan.fotoProfil} alt={'foto ' + pustakawan.nama} />
      ) : (
        <div className='w-16 h-16 text-2xl mx-auto rounded-full flex items-center justify-center bg-accent/40'>{pustakawan.nama[0]}</div>
      )}
      <Link to={pustakawan._id} className='mt-4 font-semibold group-hover:underline'>{pustakawan.nama}</Link>

      <StatusAkunBadge statusAkun={pustakawan.statusAkun} />
      <p className='text-xs text-muted-foreground mt-2'>Sejak {formatedDate(pustakawan.createdAt)}</p>
    </section>
  )
}

export default PustakawanCard