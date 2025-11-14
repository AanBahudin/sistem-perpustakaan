import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ImageOff } from "lucide-react"


const LandingKatalogBook = ({item, handleNavigate} : {item: any, handleNavigate: (id: string) => void}) => {

    let newJudul: string = item.judul
    if (newJudul.length >= 25) {
        newJudul = newJudul.slice(0,27) + '...'
    }
    const newDeskripsi = item.deskripsi.slice(0,120)
    const newTagline = item.tagline.slice(0, 40)

    return (
        <section className='col-span-4 p-2 dark:bg-transparent bg-[#f2f2f2] flex items-center justify-center gap-x-4 rounded-xl border hover:border-primary duration-150 ease-in-out group'>
            {item.cover ? (
                <img src={item.cover} className='w-[300px] h-[160px] overflow-hidden rounded object-cover object-center' alt="" /> 
              ) : (
                <div className='w-[300px] h-[160px] overflow-hidden rounded flex items-center justify-center border'> <ImageOff /> </div> 
              )
            }

            <main className='flex items-start justify-start flex-col'>
              <Link to={`/katalog/${item._id}`}>
                <h1 className='text-lg font-semibold group-hover:underline duration-150 ease-in-out'>{newJudul}</h1>
              </Link>
              <p className='capitalize italic text-[12px] text-muted-foreground text-ellipsis w-full'>{newTagline}...</p>
              <p className='text-muted-foreground text-[12px] my-4'>{newDeskripsi}...</p>

              <div className='w-full flex gap-x-2'>
                <Button onClick={() => handleNavigate(item._id)} className='flex-1 text-white text-[12px] self-start flex flex-col' size='sm'>Selengkapnya</Button>
              </div>
            </main>
        </section>
    )
}

export default LandingKatalogBook