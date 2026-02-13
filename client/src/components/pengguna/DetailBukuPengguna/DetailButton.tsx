import { Button } from '@/components/ui/button'
import { CircleFadingArrowUp } from 'lucide-react'
import PengajuanCancelButton from './PengajuanCancelButton'
import { Link } from 'react-router-dom'

type DetailButtonType = {
    stok: number,
    status: 'Dipinjam' | 'Diajukan' | 'Terlambat' | undefined | 'Ditolak',
    idPeminjaman?: string,
    idBuku: string
}

const DetailButton = ({status, idPeminjaman, idBuku} : DetailButtonType) => {

    // REFACTOR INI BARANG
    console.log(status)

    return (
        <>
            {status === 'Diajukan' && <PengajuanCancelButton idPeminjaman={idPeminjaman!} idBuku={idBuku} />}
            {status === 'Dipinjam' && (
                <main className='flex items-center gap-x-3'>
                    <PerpanjangButton idPeminjaman={idPeminjaman} />
                </main>
            )}
            {status === 'Ditolak' && <TertolakButton />}
            {status === 'Terlambat' && <TerlambatButton />}
        </>
    )
}

const PerpanjangButton = ({idPeminjaman} : {idPeminjaman: any}) => {
    return (
        <Link to={`/my/confirm/perpanjangan/${idPeminjaman}`} className="w-full flex items-center mt-4 gap-x-8 cursor-pointer">
            <Button className="flex items-center gap-x-2 text-white bg-primary text-center w-full">
                <CircleFadingArrowUp />
                Perpanjang
            </Button>
        </Link>
    )
}

const TerlambatButton = () => {
    return (
        <div className="flex items-center mt-4 gap-x-8">
            <Button variant='default' className="text-white text-center w-1/2">Kembalikan</Button>
            <p className="text-muted-foreground text-sm">Peminjaman buku ini telah terlambat</p>
        </div>
    )
}

const TertolakButton = () => {
    return (
        <div>
            <Button variant='destructive' className='text-white text-center w-full text-sm mt-6'>Peminjaman Ditolak</Button>
        </div>
    )
}

export default DetailButton