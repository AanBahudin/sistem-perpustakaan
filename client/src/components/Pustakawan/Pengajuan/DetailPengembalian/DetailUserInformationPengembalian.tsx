import { Ellipsis, User } from 'lucide-react'
import DetailPengajuanInformation from "../DetailPeminjaman/DetailPengajuanInformation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Link } from 'react-router-dom'

const DetailUserInformationPengembalian = ({pengguna} : {pengguna: any}) => {

    return (
        <section className='w-1/3 border rounded-xl h-fit p-2'>
            <main className='flex items-center justify-between'>
                <h1 className='uppercase text-xs font-semibold'>Detail Pengguna</h1>
    
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className='w-8 h-8 flex items-center justify-center hover:bg-muted p-1 rounded-full'>
                            <Ellipsis className='w-4 h-4 stroke-muted-foreground' />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48" align="start">
                        <DropdownMenuItem className='text-xs p-2'>
                            <Link to={`/pustakawan/pengguna/detail/${pengguna?._id}`} className='flex items-center gap-x-2'>
                                <>
                                    <User className='w-3 h-3 ' /> 
                                    Lihat pengguna
                                </>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </main>
                    
            <main className='flex items-center justify-start gap-x-4 my-2 px-2'>
                {pengguna.fotoProfil ? (
                    <img className='w-10 h-10 rounded-full object-cover' src={pengguna?.fotoProfil} alt={pengguna?.nama} />
                ) : (
                    <div className='w-10 h-10 rounded-full bg-muted flex items-center justify-center font-semibold text-xl'>{pengguna?.nama[0]}</div>
                )}
    
                <div className='flex flex-col items-statr justify-center'>
                    <h1 className='font-bold capitalize text-xs'>{pengguna?.nama}</h1>
                    <h5 className='text-xs text-muted-foreground'>{pengguna?.email}</h5>
                </div>
            </main>
                
            <main className='my-1 w-full p-2 rounded'>
                {/* <h5 className='font-semibold uppercase text-xs mb-3'>Informasi Tambahan</h5> */}
    
                <div className='my-2 text-xs flex flex-col gap-y-2 text-muted-foreground'>
                    <DetailPengajuanInformation label='ID Universitas' value={pengguna?.idKampus} />
                    <DetailPengajuanInformation label='Status' value={pengguna?.role} />
                    <DetailPengajuanInformation label='Jurusan' value={pengguna?.jurusan} />
                    <DetailPengajuanInformation label='Nomor Telepon' value={pengguna?.no_hp || '-'} />
                </div>
            </main>
        </section>
    )
}

export default DetailUserInformationPengembalian