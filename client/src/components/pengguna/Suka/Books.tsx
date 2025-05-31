import GridLayoutButtons from "@/globals/GridLayoutButtons"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import SukaPageNoData from "@/components/NoDataDisplay/SukaPageNoData"


const Books = ({books}: {books:any}) => {
    if (books.length === 0) {
        return <SukaPageNoData />
    }

  return (
    <section className='w-full grid grid-cols-12 gap-6 mt-10'>
        {books.map((item:any, index: number) => {
            let newJudul: string = item.judul
            if (newJudul.length >= 25) {
                newJudul = newJudul.slice(0,27) + '...'
            }
            const newDeskripsi = item.deskripsi.slice(0,120)
            const newTagline = item.tagline.slice(0, 40)

            return (
                <main key={index} className='col-span-4 bg-card p-2  flex items-center justify-center gap-x-4 rounded-xl border hover:border-primary duration-150 ease-in-out group'>
                <img src={item.cover} className='w-[300px] h-[160px] overflow-hidden rounded object-cover object-center' alt="" />

                <div className='flex items-start justify-start flex-col'>
                    <Link to={`/my/buku/${item._id}`}>
                        <h1 className='text-lg font-semibold group-hover:underline duration-150 ease-in-out'>{newJudul}</h1>
                    </Link>
                    <p className='capitalize italic text-[12px] text-muted-foreground text-ellipsis w-full'>{newTagline}...</p>
                    <p className='text-muted-foreground text-[12px] my-4'>{newDeskripsi}...</p>

                    <div className='w-full flex gap-x-2'>
                    <Button asChild className='flex-1 text-white text-[12px] self-start flex flex-col' size='sm'>
                        <Link to={`/my/buku/${item._id}`}>Selengkapnya</Link>
                    </Button>
                    <GridLayoutButtons id={item._id}/>
                    </div>
                </div>
                </main>
            )
        })}
    
    </section>
  )
}

export default Books