import BookGrid from "../KatalogBukuPengguna/BookGrid"

const YouMayLIkeBookContainer = () => {

    return (
        <section className="w-full">
            <h1 className="text-xl text-muted-foreground font-semibold uppercase">kamu mungkin juga suka</h1>

            <main className="w-full my-10">
                <BookGrid/>
            </main>
        </section>
    )
}

export default YouMayLIkeBookContainer