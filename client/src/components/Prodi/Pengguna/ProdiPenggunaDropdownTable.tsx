import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Ellipsis, CheckCircle, CircleUserRound, UserRoundX } from "lucide-react"
import BlokirPenggunaAlert from "./BlokirPenggunaAlert"
import { useSelector } from "react-redux"
import { store } from "@/store"
import { setBlokirPenggunaAlert, setBukuBlokirPenggunaAlert } from "@/cart/Prodi/prodiPenggunaSlice"
import BukaBlokirPenggunaAlert from "./BukaBlokirPenggunaAlert"

const ProdiPenggunaDropdownTable = ({dataPengguna} : {dataPengguna: any}) => {

  const { verifikasiProdi, blocked } = dataPengguna
  const { blokirPenggunaAlert, bukaBlokirPenggunaAlert } = useSelector((state: any) => state.prodiPenggunaSlice)

  const handleBlokirPengguna = (e: any) => {
    store.dispatch(setBlokirPenggunaAlert(true))
  }

  const handleBukaBlokirPengguna = () => {
    store.dispatch(setBukuBlokirPenggunaAlert(true))
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='w-6 h-6 flex items-center justify-center hover:bg-muted rounded-full'>
            <Ellipsis className="hover:bg-accent/40 duration-200 ease-in-out w-6 h-6 rounded-full p-1" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48" align="start">
      
          <DropdownMenuItem className=' flex items-center gap-x-2 text-xs p-2'>
            <div className="flex items-center justify-center gap-x-4">
              <CircleUserRound className='w-3 h-3 ' /> 
              Detail Pengguna
            </div>
          </DropdownMenuItem>

          {!verifikasiProdi && (
            <DropdownMenuItem className=' flex items-center gap-x-2 text-xs p-2'>
              <div className="flex items-center justify-center gap-x-4">
                <CheckCircle className='w-3 h-3 stroke-primary' /> 
                Verifikasi Akun
              </div>
            </DropdownMenuItem>
          )}

          {
            blocked ? (
              <DropdownMenuItem onClick={handleBukaBlokirPengguna} variant="default" className=' flex items-center gap-x-2 text-xs p-2 bg-primary !focus:bg-primary/70'>
                <div className="flex items-center justify-center gap-x-4 text-white">
                  <UserRoundX className='w-3 h-3 stroke-white' /> 
                  Buka Blokir
                </div>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={(e: any) => handleBlokirPengguna(e)} variant="destructive" className=' flex items-center gap-x-2 text-xs p-2 bg-destructive !hover:bg-destructive/70'>
                <div className="flex items-center justify-center gap-x-4 text-white">
                  <UserRoundX className='w-3 h-3 stroke-white' /> 
                  Blokir Pengguna
                </div>
              </DropdownMenuItem>
            )
          }
        </DropdownMenuContent> 
      </DropdownMenu>

      {blokirPenggunaAlert && <BlokirPenggunaAlert dataPengguna={dataPengguna} />}
      {bukaBlokirPenggunaAlert && <BukaBlokirPenggunaAlert dataPengguna={dataPengguna} />}
      
    </>
  )
}

export default ProdiPenggunaDropdownTable