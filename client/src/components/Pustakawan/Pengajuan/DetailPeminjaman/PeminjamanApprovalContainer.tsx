import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Check, CircleAlert, CircleCheck, TriangleAlert, X } from "lucide-react"
import DetailPeminjamanConfirmDialog from "./DetailPeminjamanConfirmDialog"
import DetailPeminjamanTolakDialog from "./DetailPeminjamanTolakDialog"


const  PeminjamanApprovalContainer = ({peminjaman} : {peminjaman: any}) => {

    const { peminjam } = peminjaman

    if (peminjaman.statusPeminjaman === 'Dipinjam') return <AcceptedPengajuanBanner />
    if (peminjaman.statusPeminjaman === 'Ditolak') return <DeclinePengajuanBanner />
    if (peminjam.statusPeminjaman === 'Terlambat') return <TerlambatPengajuanBanner />
    if (peminjam.statusPeminjaman === 'Dikembalikan') return <ReturnedPengajuanBanner />

    return (
        <Alert className='w-full flex items-center justify-between my-6'>
            <h1 className='text-sm font-light'>
                <span className='text-primary font-bold underline'>{peminjam.nama}</span> mengajukan peminjaman, Terima pengajuan?
            </h1>

            <main className='flex items-center gap-x-4'>
                <DetailPeminjamanTolakDialog idPeminjaman={peminjaman._id}>
                    <Button size='icon' className='bg-destructive hover:bg-destructive/50 ease-in-out duration-200 text-center text-xs text-white'><X /></Button>
                </DetailPeminjamanTolakDialog>

                <DetailPeminjamanConfirmDialog idPeminjaman={peminjaman._id}>
                    <Button className='text-center text-white hover:bg-primary/50 ease-in-out duration-200'><Check /></Button>
                </DetailPeminjamanConfirmDialog>
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

export const TerlambatPengajuanBanner = () => {
    return (
        <Alert className="w-full my-6 flex bg-muted">
            <TriangleAlert />
            <h1 className="text-sm font-semibold">Pengajuan telah terlambat, Segera hubungi pengguna untuk pengembalian</h1>
        </Alert>
    )
}

export const ReturnedPengajuanBanner = () => {
    return (
        <Alert className="w-full my-6 flex bg-primary/60">
            <Check />
            <h1 className="text-sm font-semibold">Pengajuan telah dikembalikan</h1>
        </Alert>
    )
}

export default PeminjamanApprovalContainer