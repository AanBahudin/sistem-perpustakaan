import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Check, X, CircleAlert, CircleCheck } from "lucide-react"
import { Link } from "react-router-dom"

const PengembalianApprovalContainer = ({pengembalian} : {pengembalian: any}) => {

  const {
    statusPengembalian,
    idPeminjaman,
    idPengguna: peminjam, 
    idBuku: buku } = pengembalian

  if (statusPengembalian === 'Dikembalikan') return <AcceptedPengajuanBanner />

  return (
    <Alert className='w-full flex items-center justify-between my-6'>
      <h1 className='text-sm font-light'>
        Selesaikan pengembalian pada peminjaman <span className='text-primary font-bold underline'>{idPeminjaman._id}</span> 
      </h1>

      <main className='flex items-center gap-x-4'>
          <Button className="text-white text-xs" asChild>
            <Link to={`blabal`}>
              Selesaikan Pengembalian
            </Link>
            </Button>
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

export default PengembalianApprovalContainer