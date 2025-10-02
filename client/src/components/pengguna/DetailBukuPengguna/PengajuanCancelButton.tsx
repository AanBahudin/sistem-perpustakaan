import CancelPengajuanBukuDialog from '@/components/dialog/CancelPengajuanBukuDialog'
import { Button } from '@/components/ui/button'

const PengajuanCancelButton = ({idPeminjaman, idBuku} : {idPeminjaman: string, idBuku: string}) => {
  return (
    <section className="w-full flex items-center mt-4 gap-x-8">
        <CancelPengajuanBukuDialog idPeminjaman={idPeminjaman} idBuku={idBuku}>
            <Button className="text-white bg-destructive/80 hover:bg-destructive text-center w-1/3">Batalkan Pengajuan</Button>
        </CancelPengajuanBukuDialog>
    </section>
  )
}

export default PengajuanCancelButton