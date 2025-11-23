import { getSuggestedBookPengguna } from "@/actions/Pengguna/Buku"
import { useQuery } from "@tanstack/react-query"
import { ImageOff } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import SuggestedBookLoading from "./SuggestedBookLoading"

type SuggestedBookType = {
    dataBuku: any
}

const SuggestedBook = ({dataBuku} : SuggestedBookType) => {

    const {id} = useParams()
    const {data, isLoading} = useQuery({
        queryKey: ['suggested', id],
        queryFn: () => getSuggestedBookPengguna({idBuku: id as string})
    })

    if (isLoading) return <SuggestedBookLoading />

    return (
        <section className="w-full">
            <h1 className="text-xl text-muted-foreground font-semibold uppercase">kamu mungkin juga suka</h1>

            <main className="w-full grid grid-cols-6 justify-items-stretch gap-y-4 my-6">
                {data.map((item: any) => {
                    let judul : string = item.judul
                    if (judul.length > 40) {
                        judul = judul.slice(0,35) + '...'
                    }
                    return (
                        <Link key={item._id} to={`/my/buku/${item._id}`} className="w-48 rounded justify-stretch flex flex-col self-start">
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

export default SuggestedBook