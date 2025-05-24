type StatusPerpanjanganType = {
    status : 'Diterima' | 'Pending' | 'Ditolak'
}

const StatusPerpanjanganGrid = ({status} : StatusPerpanjanganType) => {
  return (
    <>
      {status === 'Diterima' && <Diterima />}
      {status === 'Pending' && <Pending />}
      {status === 'Ditolak' && <Ditolak />}
    </>
  )
}

const Diterima = () => {
    return (
        <h3 className="w-full text-center bg-primary  self-center py-1 rounded text-sm text-white">Diterima</h3>
    )
}

const Pending = () => {
    return (
        <h3 className="w-full text-center bg-muted-foreground self-center py-1 rounded text-sm text-muted">Diajukan</h3>
    )
}

const Ditolak = () => {
    return (
        <h3 className="w-full text-center bg-destructive  self-center py-1 rounded text-sm text-white">Ditolak</h3>
    )
}

export default StatusPerpanjanganGrid