import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"
import { Link } from "react-router-dom"

const DetailBukuDropdownMenu = ({idBuku} : {idBuku: string}) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <main className='w-8 h-8 p-2 flex items-center justify-center rounded-full hover:bg-accent/40 bg-transparent border'>
                <Ellipsis className='stroke-white' />
            </main>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48 !text-xs" align="start">
            <DropdownMenuItem className="text-xs">
                <Link to={`/pustakawan/buku/buat`}>Tambah Buku</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs">
                <Link to={`/pustakawan/buku/edit/${idBuku}`}>Edit Buku</Link>
            </DropdownMenuItem>
        </DropdownMenuContent> 
    </DropdownMenu>
  )
}

export default DetailBukuDropdownMenu