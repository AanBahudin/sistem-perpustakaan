type StatusPeminjamanType = {
    status : 'Dipinjam' | 'Dikembalikan' | 'Terlambat' | 'Diajukan' | 'Ditolak'
}


const StatusPeminjaman = ({status} : StatusPeminjamanType) => {
    return (
        <>
            {status === 'Dipinjam' && <Diterima />}
            {status === 'Dikembalikan' && <Dikembalikan />}
            {status === 'Terlambat' && <Terlambat />}
            {status === 'Diajukan' && <Diajukkan />}
            {status === 'Ditolak' && <Ditolak />}
        </>
    )
}

const Diajukkan = () => {
    return (
        <h3 className="w-full text-center bg-muted-foreground self-center py-1 mt-4 rounded text-sm text-muted">Diajukan</h3>
    )
}

const Diterima = () => {
    return (
        <h3 className="w-full text-center bg-primary  self-center py-1 mt-4 rounded text-sm text-white">Diterima</h3>
    )
}

const Dikembalikan = () => {
    return (
        <h3 className="w-full text-center bg-secondary  self-center py-1 mt-4 rounded text-sm text-white">Dikembalikan</h3>
    )
}

const Terlambat = () => {
    return (
        <h3 className="w-full text-center bg-destructive  self-center py-1 mt-4 rounded text-sm text-white">Terlambat</h3>
    )
}

const Ditolak = () => {
    return (
        <h3 className="w-full text-center bg-destructive  self-center py-1 mt-4 rounded text-sm text-white">Ditolak</h3>
    )
}

export default StatusPeminjaman