import { Link } from "react-router-dom"
import { ImageOff } from "lucide-react"

const SuggestedBooks = ({suggestedBooks} : {suggestedBooks: any}) => {
  return (
    <section className='w-full my-30'>
      <h1 className="text-xl text-muted-foreground font-semibold uppercase">kamu mungkin juga suka</h1>
      
      <main className="w-full grid grid-cols-6 justify-items-stretch gap-y-4 my-6">
        {suggestedBooks.map((item: any) => {
          let judul : string = item.judul
          if (judul.length > 40) {
              judul = judul.slice(0,35) + '...'
          }
          return (
            <Link key={item._id} to={`/katalog/${item._id}`} className="w-48 rounded justify-stretch flex flex-col self-start">
              {item.cover ? (
                  <img src={item.cover} className="w-full h-52 rounded object-cover" alt={item.judul} />
              ) : (
                  <div className="w-full h-52 rounded flex items-center justify-center border"> <ImageOff /> </div>
              )}
              <div className="h-full flex flex-col justify-between">
                <h5 className="text-sm font-semibold">{judul}</h5>
                <p className="text-muted-foreground text-sm mt-1">{item.penulis}</p>
              </div>
            </Link>
          )
        })}
      </main>
    </section>
  )
}

export default SuggestedBooks