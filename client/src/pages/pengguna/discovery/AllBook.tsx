import { getAllBuku } from "@/actions/BukuActions"
import BookGrid from "@/components/pengguna/Katalog Buku Pengguna/BookGrid"
import BookPagination from "@/components/pengguna/Katalog Buku Pengguna/BookPagination"
import { useQuery } from "@tanstack/react-query"

const AllBook = () => {

    const {data, isLoading} = useQuery({
        queryKey: ['buku'],
        queryFn: () => getAllBuku()
    })

    return (
        <section className="w-full pb-20">
            <h1 className="text-3xl font-bold mt-10">Telusuri Semua Buku</h1>
            <p className="text-muted-foreground mt-2 text-sm w-2/3">Temukan seluruh koleksi buku kami secara lengkap dan terstruktur. Halaman ini menampilkan setiap judul beserta penulisnya, memudahkan navigasi dan pencarian tanpa gangguan</p>


            {isLoading ? (
                <h1>Loading ...</h1>
            ) : (
                <>
                    <main className="my-10">
                        <BookGrid dataBuku={data.data.buku}  />      
                    </main>
                    <BookPagination totalPage={data.total} />
                </>
            )}
        </section>
    )
}

export default AllBook