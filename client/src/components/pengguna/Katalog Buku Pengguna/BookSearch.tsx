import { useRef } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"
import { useNavigate, useSearchParams } from "react-router-dom"

const BookSearch = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams)
  let search = params.get('search') || ''

  const searchRef = useRef<HTMLInputElement>(null)

  const handleSearch = useDebouncedCallback((event) => {
    const value = event.target.value
    if (!value) {
      params.delete('search')
    } else {
      params.set('search', value)
    }
    navigate(`.?${params.toString()}`)
  }, 500)


  const removeSearchParams = () => {
    params.delete('search')

    if (searchRef.current) {
      searchRef.current.value = ''
    }
    navigate(`.?${params.toString()}`)
  }

  return (
    <section id="bookSearch" className="w-full flex items-center h-fit gap-x-2 justify-center mb-10">
      <main className="w-2/3 flex items-center justify-stretch border rounded-lg bg-secondary">
        <div className="w-[40px] items-center flex justify-center bg-transparent h-full border-r">
          <Search className="p-[1px] h-full stroke-muted-foreground" />
        </div>
        <Input ref={searchRef} defaultValue={search} onChange={handleSearch} className="!bg-transparent border-none rounded-none px-4 selection:text-white focus:outline-none focus:ring-0 focus-visible:ring-0" placeholder="Temukan buku berdasarkan judul, penulis, ataupun penerbit..." />
      </main>
      <X onClick={removeSearchParams} className={`w-8 bg-secondary stroke-destructive border rounded h-full p-1 ${!search ? 'hidden' : ''}`} />
    </section>
  )
}

export default BookSearch