
type StatusPerpanjanganType = {
    status : 'Diterima' | 'Pending' | 'Ditolak'
}

const StatusPerpanjanganList = ({status} : StatusPerpanjanganType) => {
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
        <h3 className="bg-primary px-6 text-sm py-1 text-white rounded">Diterima</h3>
    )
}

const Pending = () => {
    return (
        <h3 className="bg-muted-foreground text-muted px-6 text-sm py-1 rounded">Diajukan</h3>
    )
}

const Ditolak = () => {
    return (
        <h3 className="bg-destructive px-6 text-white text-sm py-1 rounded">Ditolak</h3>
    )
}

export default StatusPerpanjanganList