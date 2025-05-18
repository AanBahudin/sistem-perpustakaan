import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const PeminjamanSearch = () => {
  return (
    <div className="w-full flex items-center border my-6 rounded bg-muted">
        <Search className="bg-transparent mx-4 stroke-muted-foreground bg-mute" />
        <Input className="w-full border-none focus:outline-none focus:ring-0 focus-visible:ring-0 !bg-muted rounded-none placeholder:text-muted-foreground focus:placeholder:text-transparent" placeholder="Kamu bisa mencari nama buku yang dipinjam" />
    </div>
  )
}

export default PeminjamanSearch