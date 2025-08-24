import { Ellipsis, FileCheck, FileSymlink, SquareLibrary, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

type TabelDropdownMenuType = {
    idPengguna?: string,
    idPeminjaman?: string,
    idPengembalian?: string,
    idBuku?: string
}

const TabelDropdownMenu = ({ idPengguna, idPeminjaman, idPengembalian, idBuku } : TabelDropdownMenuType) => {

    const navigate = useNavigate()
    const navigatePengguna = (event: any) => {
        event.stopPropagation()
        navigate(`/pustakawan/pengguna/detail/${idPengguna}`)
    }

    const navigatePeminjaman = (event: any) => {
        event.stopPropagation()
        navigate(`/pustakawan/pengajuan/peminjaman/${idPeminjaman}`)
    }

    const navigatePengembalian = (event: any) => {
        event.stopPropagation()
        navigate(`/pustakawan/pengajuan/pengembalian/${idPengembalian}`)
    }

    const navigateDetailBuku = (event: any) => {
        event.stopPropagation()
        navigate(`/pustakawan/buku/detail/${idBuku}`)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className='w-8 h-8 flex items-center justify-center hover:bg-muted p-1 rounded-full'>
                    <Ellipsis className="w-3 h-3" />
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48" align="start">

                {/* MENU DATA PEMINJAMAN */}
                {idPeminjaman && (
                    <DropdownMenuItem
                        onClick={(e) => navigatePeminjaman(e)}
                            className=' flex items-center gap-x-2 text-xs p-2'>
                            <>
                                <FileCheck className='w-3 h-3 ' /> 
                                Lihat Pinjaman
                            </>
                    </DropdownMenuItem>
                )}

                {/* MENU DATA PENGEMBALIAN */}
                {idPengembalian && (
                    <DropdownMenuItem
                        onClick={(e) => navigatePengembalian(e)}
                        className=' flex items-center gap-x-2 text-xs p-2'>
                            <>
                                <FileSymlink className='w-3 h-3 ' /> 
                                Lihat Pengembalian
                            </>
                    </DropdownMenuItem>
                )}

                {/* MENU DATA PENGGUNA */}
                {idPengguna && (
                    <DropdownMenuItem
                        onClick={(e) => navigatePengguna(e)}
                            className=' flex items-center gap-x-2 text-xs p-2'>
                            <>
                                <User className='w-3 h-3 ' /> 
                                Lihat pengguna
                            </>
                    </DropdownMenuItem>
                )}

                {/* MENU DATA PENGGUNA */}
                {idBuku && (
                    <DropdownMenuItem
                        onClick={(e) => navigateDetailBuku(e)}
                            className=' flex items-center gap-x-2 text-xs p-2'>
                            <>
                                <SquareLibrary className='w-3 h-3 ' /> 
                                Lihat Buku
                            </>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent> 
        </DropdownMenu>
    )
}

export default TabelDropdownMenu