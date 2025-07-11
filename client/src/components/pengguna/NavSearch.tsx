import { searchBook } from "@/actions/searchActions"
import { Input } from "../ui/input"
import { useDebouncedCallback } from "use-debounce"

const NavSearch = () => {


  const handleSearch = useDebouncedCallback(async (value: string | null) => {
    await searchBook(value)
  }, 600)


  return (
    <div>
        <Input onChange={(e) => handleSearch(e.target.value)} className="w-[500px] hidden md:block selection:text-white" placeholder="Cari sesuatu..." />
    </div>
  )
}

export default NavSearch