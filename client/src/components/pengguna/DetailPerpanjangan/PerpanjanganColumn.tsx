import { Button } from "@/components/ui/button"
import TimeDisplay from "../Detail Pengembalian/TimeDisplay"
import PerpanjanganDetailDisplay from "./PerpanjanganDetailDisplay"
import CancelPerpanjangan from "@/components/dialog/CancelPerpanjangan"
import { Pen } from "lucide-react"
import EditPengajuanPerpanjanganDialog from "@/components/dialog/EditPengajuanPerpanjanganDialog"

type PerpanjanganColumnType = {
    peminjaman: any,
    perpanjangan: any
}

const PerpanjanganColumn = ({peminjaman, perpanjangan} : PerpanjanganColumnType) => {

    let {createdAt: tanggalPeminjaman, berakhirPada} = peminjaman
    let {disetujui} = perpanjangan

    return (
        <section className="rounded-2xl h-fit p-6 col-span-4 border">
            <main className="w-full flex justify-between items-center">
                <h1 className='font-bold uppercase'>Detail summary</h1>

                {disetujui === 'Pending' && (
                    <EditPengajuanPerpanjanganDialog perpanjangan={perpanjangan}>
                        <Button className="w-6 h-6 rounded-md bg-primary flex items-center justify-center p-[12px]">
                            <Pen className="stroke-white" />
                        </Button>
                    </EditPengajuanPerpanjanganDialog>
                )}
            </main>

            <main className='bg-popover rounded-lg p-4 mt-4 mb-4'>
                <TimeDisplay tanggalPinjam={tanggalPeminjaman} tanggalKembali={berakhirPada} />
                <PerpanjanganDetailDisplay peminjaman={peminjaman} perpanjangan={perpanjangan} />
            </main> 

            <h1 className='font-bold uppercase'>status perpanjangan</h1>
            <Button variant={disetujui === 'Diterima' ? 'default' : (disetujui === 'Ditolak' ? 'destructive' : 'secondary')} disabled className='my-4 w-full text-center text-white'> Perpanjangan {disetujui}</Button>

            {
                disetujui && <CancelPerpanjangan perpanjangan={perpanjangan} />
            }
        </section>
    )
}

export default PerpanjanganColumn