import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, User, UserX } from "lucide-react"
import { store } from "@/store"
import NonaktifkanPustakawanAlert from "./NonaktifkanPustakawanAlert"
import { setNonaktifAlert } from "@/cart/Prodi/prodiPustakawanSlice"
import { useNavigate } from "react-router-dom"

const ProdiPustakawanDropdownMenu = ({idPustakawan} : {idPustakawan: string}) => {

    const navigate = useNavigate()
    const handleNavigate = (id: string) => {
        navigate(id)
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <EllipsisVertical className='absolute w-6 h-6 p-1.5 duration-200 ease-in-out top-2 right-5 rounded-full hover:bg-accent/50 ' />
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="w-56" align="start">

                    <DropdownMenuItem className="text-xs" onSelect={() => handleNavigate(idPustakawan)}>
                        <User className="mr-2 h-4 w-4" />
                        Detail Pustakawan
                    </DropdownMenuItem>

                    
                    <DropdownMenuItem className="text-xs text-destructive focus:text-destructive" onSelect={() => store.dispatch(setNonaktifAlert(true))}>
                        <UserX className="mr-2 w-2 h-2" />
                        Nonaktifkan Pustakawan
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
            <NonaktifkanPustakawanAlert idPustakawan={idPustakawan} />
        </>
    )
}

export default ProdiPustakawanDropdownMenu