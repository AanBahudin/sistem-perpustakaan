import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"
import StatusPembayaranDropdown from "./StatusPembayaranDropdown"

const PengembalianSearch = () => {

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const params = new URLSearchParams(searchParams)
    const search = searchParams.get('judulBuku')

    const handleSearch = useDebouncedCallback((value: string) => {
      if (value) {
        params.set('judulBuku', value)
      } else {
        params.delete('judulBuku')
      }
      navigate(`?${params.toString()}`);
    }, 500) 

    return (
      <section className="w-full flex items-cente gap-x-2 my-6">
        <div className="w-2/3 flex items-center border rounded bg-muted">
          <Search className="bg-transparent mx-4 stroke-muted-foreground bg-mute " />
          <Input defaultValue={search  || ''} onChange={(e) => handleSearch(e.target.value)} className="w-full border-none selection:text-white focus:outline-none focus:ring-0 focus-visible:ring-0 !bg-muted rounded-none placeholder:text-muted-foreground focus:placeholder:text-transparent" placeholder="Kamu bisa mencari nama buku yang dipinjam" />
        </div>

        <StatusPembayaranDropdown />
      </section>
    )
}

export default PengembalianSearch