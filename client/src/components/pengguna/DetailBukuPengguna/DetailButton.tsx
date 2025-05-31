import { tambahPeminjaman } from '@/actions/peminjamanActions'
import FormContainer from '@/components/form/FormContainer'
import { Button } from '@/components/ui/button'
import { useFormStatus } from '@/context/FormContext'
import { Loader2 } from 'lucide-react'
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
            {status === 'Dipinjam' && <DipinjamButton />}
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

const DiajukanButton = ({idPeminjaman, idBuku} : {idPeminjaman: string, idBuku: string}) => {

    const {isLoading} = useFormStatus()

    return (
        <section className="w-full flex items-center mt-4 gap-x-8">
            <input type="hidden" name="idPeminjaman" id="idPeminjaman" value={idPeminjaman} />
            <input type="hidden" name="idBook" id="idBook" value={idBuku} />
            <Button disabled={isLoading} type='submit' className="text-white bg-destructive/80 hover:bg-destructive text-center w-1/2">
                {isLoading ? (
                    <>
                        <Loader2 className='animate-spin' />
                        <span>Membatalkan...</span>
                    </>
                ) : 'Batalkan Pengajuan'}
            </Button>
            <p className="text-muted-foreground text-sm">Anda telah mengajukan peminjaman untuk buku ini</p>
        </section>
    )
}

const DipinjamButton = () => {
    return (
        <div className="flex items-center mt-4 gap-x-8">
            <Button variant='secondary' className="text-white text-center w-1/2">Sedang Dipinjam</Button>
            <p className="text-muted-foreground text-sm w-full">Silahkan perpanjang untuk menggunakan lagi</p>
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