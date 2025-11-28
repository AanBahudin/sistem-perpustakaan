import CancelPeminjamanBukuDialog from '@/components/pengguna/DetailPeminjaman/CancelPeminjamanBukuDialog'
import { Button } from '@/components/ui/button'

const PengajuanCancelButton = ({idPeminjaman, idBuku} : {idPeminjaman: string, idBuku: string}) => {
  return (
    <section className="w-full flex items-center mt-4 gap-x-8">
        <CancelPeminjamanBukuDialog idPeminjaman={idPeminjaman} idBuku={idBuku}>
            <Button className="text-white bg-destructive/80 hover:bg-destructive text-center w-1/3">Batalkan Pengajuan</Button>
        </CancelPeminjamanBukuDialog>
    </section>
  )
}

export default PengajuanCancelButton