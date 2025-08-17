import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Check, X, CircleAlert, CircleCheck } from "lucide-react"
import DetailPerpanjanganTolakDialog from "./DetailPerpanjanganTolakDialog"
import DetailPerpanjanganConfirmDialog from "./DetailPerpanjanganConfirmDialog"

const PerpanjanganApprovalContainer = ({perpanjangan} : {perpanjangan: any}) => {

    const { disetujui, idPengguna: peminjam, idBuku: buku } = perpanjangan

    if (disetujui === 'Diterima') return <AcceptedPengajuanBanner />
    if (disetujui === 'Ditolak') return <DeclinePengajuanBanner />

    return (
        <Alert className='w-full flex items-center justify-between my-6'>
            <h1 className='text-sm font-light'>
                <span className='text-primary font-bold underline'>{peminjam.nama}</span> mengajukan perpanjangan pada buku <span className="text-primary font-semibold">{buku.judul}</span>, Terima pengajuan?
            </h1>

            <main className='flex items-center gap-x-4'>
                <DetailPerpanjanganTolakDialog idPerpanjangan={perpanjangan._id}>
                    <Button size='icon' className='bg-destructive hover:bg-destructive/50 ease-in-out duration-200 text-center text-xs text-white'><X /></Button>
                </DetailPerpanjanganTolakDialog>

                <DetailPerpanjanganConfirmDialog idPerpanjangan={perpanjangan._id}>
                    <Button className='text-center text-white hover:bg-primary/50 ease-in-out duration-200'><Check /></Button>
                </DetailPerpanjanganConfirmDialog>
            </main>
        </Alert>
    )
}

export const AcceptedPengajuanBanner = () => {
    return (
        <Alert className="w-full my-6 flex bg-primary">
            <CircleCheck />
            <h1 className="text-sm font-semibold">Pengajuan telah diterima</h1>
        </Alert>
    )
}

export const DeclinePengajuanBanner = () => {
    return (
        <Alert className="w-full my-6 flex bg-destructive">
            <CircleAlert />
            <h1 className="text-sm font-semibold">Pengajuan telah ditolak</h1>
        </Alert>
    )
}

export default PerpanjanganApprovalContainer