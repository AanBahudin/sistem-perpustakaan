type StatusPengembalianType = {
  status: 'Dikembalikan' | 'Pending'
}

const StatusPengembalianGrid = ({status} : StatusPengembalianType) => {
  return (
    <>
      {status === 'Pending' && <Pending />}
      {status === 'Dikembalikan' && <Dikembalikan />}
    </>
  )
}

const Dikembalikan = () => {
  return (
    <h3 className="w-full text-center bg-primary text-white self-center py-1 rounded text-sm ">Dikembalikan</h3>
  )
}

const Pending = () => {
  return (
    <h3 className="w-full text-center bg-muted-foreground place-self-end py-1 rounded text-sm text-muted">Tertunda</h3>
  )
}

export default StatusPengembalianGrid