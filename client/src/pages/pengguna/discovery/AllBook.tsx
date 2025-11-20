
import BookGrid from "@/components/pengguna/Katalog Buku Pengguna/BookGrid"
import BookPagination from "@/components/pengguna/Katalog Buku Pengguna/BookPagination"
import { Skeleton } from "@/components/ui/skeleton"
import useGetAllBukuPengguna from "@/hooks/fetchHooks/penggunaHooks/bukuHooks/useGetAllBukuPengguna"


const AllBook = () => {

    const { dataBuku, isLoading } = useGetAllBukuPengguna()

    return (
        <section className="w-full pb-20">
            <h1 className="text-3xl font-bold mt-10">Telusuri Semua Buku</h1>
            <p className="text-muted-foreground mt-2 text-sm w-2/3">Temukan seluruh koleksi buku kami secara lengkap dan terstruktur. Halaman ini menampilkan setiap judul beserta penulisnya, memudahkan navigasi dan pencarian tanpa gangguan</p>

            {isLoading ? (
                <section className='w-full grid grid-cols-12 gap-6 my-10'>
                    {Array.from({length: 12}).map((_, index: number) => {
                        return (
                            <Skeleton key={index} className="col-span-4 p-4 h-32 border" />
                        )
                    })}
                </section>
            ) : (
                <>
                    <main className="my-10">
                        <BookGrid dataBuku={dataBuku.data}  />      
                    </main>
                    <BookPagination totalPage={dataBuku.total || 0} />
                </>
            )}
        </section>
    )
}

export default AllBook