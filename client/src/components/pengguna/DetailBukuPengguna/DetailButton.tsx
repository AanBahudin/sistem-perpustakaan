import FormContainer from '@/components/form/FormContainer'
import { Button } from '@/components/ui/button'
import { useFormStatus } from '@/context/FormContext'
import { CircleFadingArrowUp, Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import PengajuanCancelButton from './PengajuanCancelButton'
import { Link } from 'react-router-dom'

type DetailButtonType = {
    stok: number,
    status: 'Dipinjam' | 'Diajukan' | 'Terlambat' | undefined,
    idPeminjaman?: string,
    idBuku: string
}

const DetailButton = ({stok, status, idPeminjaman, idBuku} : DetailButtonType) => {

    return (
        <>
            {typeof status === 'undefined' && (
                <FormContainer action={tambahPeminjaman}>
                    <PinjamButton stok={stok} idBuku={idBuku} />
                </FormContainer>
            )}
            {status === 'Diajukan' && <PengajuanCancelButton idPeminjaman={idPeminjaman!} idBuku={idBuku} />}
            {status === 'Dipinjam' && (
                <main className='flex items-center gap-x-3'>
                    <PerpanjangButton idPeminjaman={idPeminjaman} />
                </main>
            )}
            {status === 'Terlambat' && <TerlambatButton />}
        </>
    )
}

const PinjamButton = ({stok, idBuku} : {stok: number, idBuku: string}) => {

    const {isLoading} = useFormStatus()
    const {durasiPeminjaman} = useSelector((state: any) => state.detailBukuState)

    return (
        <div className="flex items-center mt-4 gap-x-8">
            <input type="hidden" name='idBuku' id='idBuku' value={idBuku} />
            <input type="hidden" name='durasiPeminjaman' id='durasiPeminjaman' value={durasiPeminjaman} />

            <Button disabled={durasiPeminjaman === '' || isLoading} variant='default' className="text-white text-center w-1/2">
                {isLoading ? (
                    <>
                        <Loader2 className='animate-spin' />
                        <span>Membatalkan...</span>
                    </>
                ) : 'Ajukkan Peminjaman'}
            </Button>
            <p className="text-muted-foreground text-sm">{stok} buku tersisa</p>
        </div>
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

export default DetailButton