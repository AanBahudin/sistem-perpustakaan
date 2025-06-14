import { tambahPeminjaman } from '@/actions/peminjamanActions'
import FormContainer from '@/components/form/FormContainer'
import { Button } from '@/components/ui/button'
import { useFormStatus } from '@/context/FormContext'
import { CircleFadingArrowUp, Loader2, Undo2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import PengajuanCancelButton from './PengajuanCancelButton'

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
                    <PerpanjangButton />
                    <PengembalianButton />
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
const PerpanjangButton = () => {
    return (
        <div className="w-full flex items-center mt-4 gap-x-8">
            <Button className="flex items-center gap-x-2 text-white bg-primary/30 text-center w-full">
                <CircleFadingArrowUp />
                Perpanjang
            </Button>
        </div>
    )
}

const PengembalianButton = () => {
    return (
        <div className="w-full flex items-center mt-4 gap-x-8">
            <Button className="text-white flex items-center gap-x-2 text-center bg-secondary/50 hover:bg-secondary ring-1 w-full">
                <Undo2 />
                Kembalikan
            </Button>
        </div>
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