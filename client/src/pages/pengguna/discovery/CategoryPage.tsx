import BookLoading from "@/components/Loading/BookLoading"
import BookGrid from "@/components/pengguna/Katalog Buku Pengguna/BookGrid"
import BookPagination from "@/components/pengguna/Katalog Buku Pengguna/BookPagination"
import KategorySection from "@/components/pengguna/Katalog Buku Pengguna/KategorySection"
import useFetchBukuBasedByCategoryPengguna from "@/hooks/fetchHooks/penggunaHooks/bukuHooks/useFetchBukuBasedByCategoryPengguna"
import { Search } from "lucide-react"

const CategoryPage = () => {
  

  // REFACTOR HERE
  // kalau bisa satukan route dengan controller untuk mengambil semua buku. refac
  // refactor kode back-end
  // refactor filter kategori
  // refactor paginationnya yang tidak akurat
  const { isLoading, dataBuku, categoryParams } = useFetchBukuBasedByCategoryPengguna()

  return (
    <section className="pb-20">
      <h1 className="text-3xl font-bold mt-10 capitalize">Menampilkan Buku {categoryParams}</h1>
      <p className="text-muted-foreground mt-2 text-sm w-2/3">Temukan seluruh koleksi buku kami secara lengkap dan terstruktur. Halaman ini menampilkan setiap judul beserta penulisnya, memudahkan navigasi dan pencarian tanpa gangguan</p>
      <KategorySection className="my-10" />

      {isLoading ? (
        <main className="mt-10">
          <BookLoading />
        </main>
      ) : (
        <main className="mt-10">
          {dataBuku?.data?.length < 1 ? (
            <div className="flex items-center justify-start gap-x-2 mt-20">
              <Search className="w-5 h-5" />
              <h3 className="text-lg text-muted-foreground">Hasil pencarian tidak ditemukan. Silakan coba dengan kata kunci atau kategori lain.</h3>
            </div>
          ) : (
            <div className="w-full flex flex-1 flex-col">
              <div className="min-h-[40vh]">
                <BookGrid dataBuku={dataBuku.data} />
              </div>
              <BookPagination totalPage={dataBuku.total} />
            </div>
          )}
        </main>
      )}

    </section>
  )
}

export default CategoryPage