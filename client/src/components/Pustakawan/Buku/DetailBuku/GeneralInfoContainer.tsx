import { UserCog } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import BookDetailInfo from "./BookDetailInfo"
import { formatedDate } from "@/utils/formatDate"

const GeneralInfoContainer = ({data} : {data: any}) => {

  const { createdBy: pustakawan } = data
  
  return (
    <section className='w-full flex items-start gap-x-8 my-4'>
      <main className='w-3/4 min-h-[40vh] rounded-xl flex items-start justify-start gap-x-4'>
        <img className='w-36 h-56 rounded' src={data.cover} alt={data.judul} />       
        <BookDetailInfo data={data} />
      </main>
      
      <main className='flex-1  items-center justify-center flex rounded-xl border flex-col p-4'>
        <h1 className='text-sm mb-4 font-semibold'>Buku Ditambahkan Oleh</h1>
        <div className="w-full flex items-center justify-center mb-2">
          {pustakawan?.fotoProfil ? (
            <img className="w-12 h-12 rounded-full object-cover" src={pustakawan.fotoProfil} alt={pustakawan?.nama} />
          ) : (
            <div className="w-12 h-12 text-xl flex items-center justify-center rounded-full border bg-accent/40 text-white">{pustakawan?.nama[0] || 'A'}</div>
          )}
        </div>
        <p className="text-muted-foreground font-semibold text-center">{pustakawan?.nama || '-'}</p>
        <div className="w-full flex items-center justify-center gap-x-1">
          <UserCog className="w-3 h-3 stroke-muted-foreground" />
          <p className="text-muted-foreground text-xs text-center">Pustakawan</p>
        </div>

        <Badge className="!text-xs mx-auto text-white mt-2">{formatedDate(data.createdAt)}</Badge>
      </main>
    </section>
  )
}

export default GeneralInfoContainer