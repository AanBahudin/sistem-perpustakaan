import { createPengembalianDataPustakawan } from "@/actions/Pustakawan/Pengembalian/pustakawanPengembalianActions"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

type BuatPengembalianButtonType = {
  idPeminjaman: string
}

const BuatPengembalianButton = ({ idPeminjaman } : BuatPengembalianButtonType) => {

  const mutation = useMutation({
    mutationFn: () => createPengembalianDataPustakawan(idPeminjaman),
    onSuccess: () => {
      toast('Data Pengembalian Dibuat')
    },
    onError: () => {
      toast('Terjadi kesalahan saat membuat data')
    }
  })

  const handleClick = () => {
    mutation.mutate()
  }

  return (
    <section className='w-full flex justify-end'>
        <Button 
          disabled={mutation.isPending}
          onClick={handleClick} 
          className='text-xs text-white'>
          {mutation.isPending ? <Loader2 className="animate-spin" /> : ' Buat data pengembalian'}
        </Button>
    </section>
  )
}

export default BuatPengembalianButton