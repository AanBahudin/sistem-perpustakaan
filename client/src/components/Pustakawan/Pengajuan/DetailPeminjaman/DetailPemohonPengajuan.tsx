import { Ellipsis, User } from 'lucide-react'
import DetailPengajuanInformation from './DetailPengajuanInformation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Link } from 'react-router-dom'

const DetailPemohonPengajuan = ({dataPemohon} : {dataPemohon: any}) => {
  return (
    <section className='w-1/4 border rounded-xl min-h-[40vh] p-4'>
        <div className='flex items-center justify-between'>
            <h1 className='uppercase text-sm font-semibold'>Detail Pengguna</h1>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className='w-8 h-8 flex items-center justify-center hover:bg-muted p-1 rounded-full'>
                        <Ellipsis className='w-4 h-4 stroke-muted-foreground' />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="start">
                    <DropdownMenuItem className='text-xs p-2'>
                        <Link to={`/pustakawan/pengguna/detail/${dataPemohon?._id}`} className='flex items-center gap-x-2'>
                            <>
                                <User className='w-3 h-3 ' /> 
                                Lihat pengguna
                            </>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>

        <div className='flex items-start justify-start gap-x-4 my-6'>
            {dataPemohon.fotoProfil ? (
                <img className='w-14 h-14 rounded-full object-cover' src={dataPemohon?.fotoProfil} alt={dataPemohon?.nama} />
            ) : (
                <div className='w-14 h-14 rounded-full bg-muted flex items-center justify-center font-semibold text-xl'>{dataPemohon?.nama[0]}</div>
            )}

            <div className='flex flex-col items-start justify-start'>
                <h1 className='font-bold capitalize text-md'>{dataPemohon?.nama}</h1>
                <h5 className='text-xs text-muted-foreground'>{dataPemohon?.email}</h5>
            </div>
        </div>

        <div className='my-2 w-full p-2 rounded bg-muted'>
            <h5 className='font-semibold uppercase text-xs mb-3'>Informasi Tambahan</h5>

            <div className='my-2 text-xs flex flex-col gap-y-2 text-muted-foreground'>
                <DetailPengajuanInformation label='ID Universitas' value={dataPemohon?.idKampus} />
                <DetailPengajuanInformation label='Status' value={dataPemohon?.role} />
                <DetailPengajuanInformation label='Jurusan' value={dataPemohon?.jurusan} />
                <DetailPengajuanInformation label='Nomor Telepon' value={dataPemohon?.no_hp || '-'} />
            </div>
        </div>
    </section>
  )
}

export default DetailPemohonPengajuan