import { Calendar } from "@/components/ui/calendar"
import BookDetailInfo from "./BookDetailInfo"

const GeneralInfoContainer = ({data} : {data: any}) => {
  return (
    <section className='w-full flex items-start gap-x-8 my-4'>
        <section className='w-3/4 min-h-[40vh] rounded-xl flex items-start justify-start gap-x-4'>
              <img className='w-36 h-56 rounded' src={data.cover} alt={data.judul} />       
              <BookDetailInfo data={data} />
        </section>
        
        <main className='flex flex-col'>
          <h1 className='text-sm mb-1 font-semibold'>Deadline Buku Dikembalikan</h1>
          <Calendar className='rounded border p-2' />
        </main>
      </section>
  )
}

export default GeneralInfoContainer