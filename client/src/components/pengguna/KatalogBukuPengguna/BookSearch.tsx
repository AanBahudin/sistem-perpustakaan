import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"

const BookSearch = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const search = params.get('search') || ''

  const handleSearch = useDebouncedCallback((event) => {
    const value = event.target.value
    if (!value) {
      params.delete('search')
    } else {
      params.set('search', value)
    }
    navigate(`.?${params.toString()}`)
  }, 500)

  return (
    <section id="bookSearch" className="w-full flex items-center justify-center mb-10">
      <main className="w-2/3 flex items-center justify-stretch border rounded-lg bg-secondary">
        <div className="w-[40px] items-center flex justify-center bg-secondary h-full border-r">
          <Search className="p-[1px] h-full stroke-muted-foreground" />
        </div>
        <Input defaultValue={search} onChange={handleSearch} className="!bg-secondary border-none rounded-none px-4 selection:text-white focus:outline-none focus:ring-0 focus-visible:ring-0" placeholder="Temukan buku berdasarkan judul, penulis, ataupun penerbit..." />
      </main>
    </section>
  )
}

export default BookSearch