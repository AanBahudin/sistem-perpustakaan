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
import { useSelector } from "react-redux"

const ProdiPustakawanDropdownMenu = ({pustakawan} : {pustakawan: any}) => {

    const navigate = useNavigate()
    const handleNavigate = (id: string) => {
        navigate(id)
    }

    const { aktifkanAlert, nonaktifAlert, activePustakawanId } = useSelector((state: any) => state.prodiPustakawanSlice)

    const handleNonaktifkanPustakawanAlert = () => {
        store.dispatch(setNonaktifAlert({pustakawanId: pustakawan._id, alertState: true}))
    }

    const handleAktifkanPustakawanAlert = () => {
        store.dispatch(setAktifAlert({pustakawanId: pustakawan._id, alertState: true}))
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <EllipsisVertical className='absolute w-6 h-6 p-1.5 duration-200 ease-in-out top-2 right-5 rounded-full hover:bg-accent/50 ' />
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="w-56" align="start">

                    <DropdownMenuItem className="text-xs" onClick={() => handleNavigate(pustakawan._id)}>
                        <div className="w-full flex items-center gap-x-2">
                            <User className="mr-2 h-4 w-4" />
                            Detail Pustakawan
                        </div>
                    </DropdownMenuItem>

                    {pustakawan.statusAkun === 'Aktif' && (
                        <DropdownMenuItem className="text-xs bg-destructive focus:bg-destructive/70" onClick={handleNonaktifkanPustakawanAlert}>
                            <div className="w-full flex items-center gap-x-2">
                                <UserX className="mr-2 w-2 h-2" />
                                Nonaktifkan Pustakawan
                            </div>
                        </DropdownMenuItem>
                    )}

                    {pustakawan.statusAkun === 'Nonaktif' && (
                        <DropdownMenuItem className="text-xs bg-primary focus:bg-primary/70" onClick={handleAktifkanPustakawanAlert}>
                            <div className="w-full flex items-center gap-x-2">
                                <UserCheck className="mr-2 w-2 h-2" />
                                Aktifkan Pustakawan
                            </div>
                        </DropdownMenuItem>
                    )}

                </DropdownMenuContent>
            </DropdownMenu>

            {(nonaktifAlert && activePustakawanId === pustakawan._id) && <NonaktifkanPustakawanAlert idPustakawan={pustakawan._id} />}
            {(aktifkanAlert && activePustakawanId === pustakawan._id) && <AktifkanPustakawanAlert idPustakawan={pustakawan._id} />} 
        </>
    )
}

export default ProdiPustakawanDropdownMenu