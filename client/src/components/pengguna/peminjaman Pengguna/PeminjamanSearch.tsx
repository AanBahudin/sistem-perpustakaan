import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useDebouncedCallback } from 'use-debounce'
import { useNavigate, useSearchParams } from "react-router-dom"

const PeminjamanSearch = () => {

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
    <div className="w-full flex items-center border my-6 rounded bg-muted">
        <Search className="bg-transparent mx-4 stroke-muted-foreground bg-mute " />
        <Input defaultValue={search  || ''} onChange={(e) => handleSearch(e.target.value)} className="w-full border-none selection:text-white focus:outline-none focus:ring-0 focus-visible:ring-0 !bg-muted rounded-none placeholder:text-muted-foreground focus:placeholder:text-transparent" placeholder="Kamu bisa mencari nama buku yang dipinjam" />
    </div>
  )
}

export default PeminjamanSearch