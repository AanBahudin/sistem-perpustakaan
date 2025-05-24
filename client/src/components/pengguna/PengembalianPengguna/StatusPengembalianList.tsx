const StatusPengembalianList = (status: any) => {
  return (
    <>
      {status.status === 'Dikembalikan' && <Dikembalikan />}
      {status.status === 'Pending' && <Pending />}
    </>
  )
}

const Dikembalikan = () => {
  return (
      <h3 className="w-28 text-center bg-primary text-muted text-sm py-1 rounded">Dikembalikan</h3>
  )
}

const Pending = () => {
  return (
      <h3 className="w-28 text-center bg-muted-foreground text-muted text-sm py-1 rounded">Pending</h3>
  )
}

export default StatusPengembalianList