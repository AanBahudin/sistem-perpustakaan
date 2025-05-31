import BookGrid from "../KatalogBukuPengguna/BookGrid"

type PropsType = {
    books: any,
    liked: any,
    saved: any,
}

const YouMayLIkeBookContainer = ({books, liked, saved} : PropsType) => {
    return (
        <section className="w-full">
            <h1 className="text-xl text-muted-foreground font-semibold uppercase">kamu mungkin juga suka</h1>

            <main className="w-full my-10">
                <BookGrid buku={books} disimpan={saved} disukai={liked} />
            </main>
        </section>
    )
}

export default YouMayLIkeBookContainer