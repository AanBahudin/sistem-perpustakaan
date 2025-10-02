import { Link } from "react-router-dom"

type SuggestedBookType = {
    dataBuku: any
}

const SuggestedBook = ({dataBuku} : SuggestedBookType) => {
    const {buku: books} = dataBuku.data
    if (books.length === 0) {
        return <h1>Oops, tidak ditemukan</h1>
    }

    return (
        <section className="w-full">
            <h1 className="text-xl text-muted-foreground font-semibold uppercase">kamu mungkin juga suka</h1>

            <main className="w-full flex items-center justify-between my-6">
                {books.map((item: any) => {
                    let judul : string = item.judul
                    if (judul.length > 40) {
                        judul = judul.slice(0,35) + '...'
                    }
                    return (
                        <Link key={item._id} to={`/my/buku/${item._id}`} className="w-48 rounded justify-stretch flex flex-col self-start">
                            <img src={item.cover} className="w-full h-52 rounded object-fit" alt={item.judul} />
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