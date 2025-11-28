import AllBookDataContainer from "@/components/pengguna/DiscoveryAllBook/AllBookDataContainer"

const AllBook = () => {
    return (
        <section className="w-full pb-20">
            <h1 className="text-3xl font-bold mt-10">Telusuri Semua Buku</h1>
            <p className="text-muted-foreground mt-2 text-sm w-2/3">Temukan seluruh koleksi buku kami secara lengkap dan terstruktur. Halaman ini menampilkan setiap judul beserta penulisnya, memudahkan navigasi dan pencarian tanpa gangguan</p>

            <AllBookDataContainer />
        </section>
    )
}

export default AllBook