import { discoverBuku } from "@/actions/BukuActions"
import BookLoading from "@/components/Loading/BookLoading"
import BookGrid from "@/components/pengguna/Katalog Buku Pengguna/BookGrid"
import BookPagination from "@/components/pengguna/Katalog Buku Pengguna/BookPagination"
import KategorySection from "@/components/pengguna/Katalog Buku Pengguna/KategorySection"
import { useQuery } from "@tanstack/react-query"
import { Search } from "lucide-react"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"


const CategoryPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const params = searchParams.get('q')


  const {data, isLoading} = useQuery({
    queryKey: ['discovery', 'category', params],
    queryFn: () => discoverBuku(params as string)
  })
  
  useEffect(() => {
    if (!params) {
      navigate('/my/buku')
    }
  })

  return (
    <section className="pb-20">
      <h1 className="text-3xl font-bold mt-10 capitalize">Menampilkan Buku {params}</h1>
      <p className="text-muted-foreground mt-2 text-sm w-2/3">Temukan seluruh koleksi buku kami secara lengkap dan terstruktur. Halaman ini menampilkan setiap judul beserta penulisnya, memudahkan navigasi dan pencarian tanpa gangguan</p>
      <KategorySection className="my-10" />

      {isLoading ? (
        <main className="mt-10">
          <BookLoading />
        </main>
      ) : (
        <main className="mt-10">
          {data?.data?.length < 1 ? (
            <div className="flex items-center justify-start gap-x-2 mt-20">
              <Search className="w-5 h-5" />
              <h3 className="text-lg text-muted-foreground">Hasil pencarian tidak ditemukan. Silakan coba dengan kata kunci atau kategori lain.</h3>
            </div>
          ) : (
            <div className="w-full flex flex-1 flex-col">
              <div className="min-h-[40vh]">
                <BookGrid dataBuku={data.data} />
              </div>
              <BookPagination totalPage={data.total} />
            </div>
          )}
        </main>
      )}

    </section>
  )
}

export default CategoryPage