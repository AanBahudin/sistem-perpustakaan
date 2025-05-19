type StatusPeminjamanType = {
    status : 'Dipinjam' | 'Dikembalikan' | 'Terlambat' | 'Diajukan' | 'Ditolak'
}

const StatusPeminjamanList = ({status} : StatusPeminjamanType) => {
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
        <h3 className="bg-muted-foreground text-muted px-6 text-sm py-1 rounded">Diajukan</h3>
    )
}

const Diterima = () => {
    return (
        <h3 className="bg-primary px-6 text-sm py-1 rounded">Diterima</h3>
    )
}

const Dikembalikan = () => {
    return (
        <h3 className="bg-secondary px-6 text-sm py-1 rounded">Dikembalikan</h3>
    )
}

const Terlambat = () => {
    return (
        <h3 className="bg-destructive px-6 text-sm py-1 rounded">Terlambat</h3>
    )
}

const Ditolak = () => {
    return (
        <h3 className="bg-destructive px-6 text-sm py-1 rounded">Ditolak</h3>
    )
}

export default StatusPeminjamanList