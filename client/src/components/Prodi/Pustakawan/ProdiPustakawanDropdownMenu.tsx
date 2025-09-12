import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, User, UserCheck, UserX } from "lucide-react"
import { store } from "@/store"
import NonaktifkanPustakawanAlert from "./NonaktifkanPustakawanAlert"
import { setAktifAlert, setNonaktifAlert } from "@/cart/Prodi/prodiPustakawanSlice"
import { useNavigate } from "react-router-dom"
import AktifkanPustakawanAlert from "./AktifkanPustakawanAlert"

const ProdiPustakawanDropdownMenu = ({pustakawan} : {pustakawan: any}) => {

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

                    <DropdownMenuItem className="text-xs" onSelect={() => handleNavigate(pustakawan._id)}>
                        <User className="mr-2 h-4 w-4" />
                        Detail Pustakawan
                    </DropdownMenuItem>

                    {pustakawan.statusAkun === 'Aktif' && (
                        <DropdownMenuItem className="text-xs bg-destructive focus:bg-destructive/70" onSelect={() => store.dispatch(setNonaktifAlert({pustakawanId: pustakawan._id, alertState: true}))}>
                            <UserX className="mr-2 w-2 h-2" />
                            Nonaktifkan Pustakawan
                        </DropdownMenuItem>
                    )}

                    {pustakawan.statusAkun === 'Nonaktif' && (
                        <DropdownMenuItem className="text-xs bg-primary focus:bg-primary/70" onSelect={() => store.dispatch(setAktifAlert({pustakawanId: pustakawan._id, alertState: true}))}>
                            <UserCheck className="mr-2 w-2 h-2" />
                            Aktifkan Pustakawan
                        </DropdownMenuItem>
                    )}

                </DropdownMenuContent>
            </DropdownMenu>
            <NonaktifkanPustakawanAlert idPustakawan={pustakawan._id} />
            <AktifkanPustakawanAlert idPustakawan={pustakawan._id} />
        </>
    )
}

export default ProdiPustakawanDropdownMenu