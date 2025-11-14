import { useNavigate } from "react-router-dom"
import { useSearchParams } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { useDebouncedCallback } from "use-debounce"

const LandingKatalogSearchInput = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const handleSearchFn = useDebouncedCallback((value: string) => {
    if (value) {
        params.delete('page')
        params.set('query', value)
    } else {
        params.delete('query')
    }

    navigate(`?${params.toString()}`)
  }, 500)

  return (
    <section className='w-full flex items-center justify-center'>
      <Input
        onChange={(e) => handleSearchFn(e.target.value)}
        className='text-xs' placeholder='Jelajahi koleksi buku perpustakaan...' />
    </section>
  )
}

export default LandingKatalogSearchInput