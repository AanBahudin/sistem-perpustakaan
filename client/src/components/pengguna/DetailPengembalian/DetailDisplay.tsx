import { Book, Calendar } from "lucide-react"
import {DetailDataDisplay} from "."

type DetailDisplayType = {
    peminjaman: any,
    pengembalian: any
}

const DetailDisplay = ({peminjaman, pengembalian} : DetailDisplayType) => {

    let {durasiPeminjaman, kondisi} = peminjaman
    let {durasiKeterlambatan, judulBuku, keadaanBuku, isMissing} = pengembalian  

  return (
    <section>
        <DetailDataDisplay title="total hari peminjaman" value={`${durasiPeminjaman} hari`} Icon={Calendar} />
        <DetailDataDisplay title="total hari keterlambatan" value={`${durasiKeterlambatan} hari`} Icon={Calendar} variant="stroke-destructive"/>

        <main className='w-full flex items-center justify-between'>
            <main className='mt-4'>
                <p className='uppercase text-[12px] text-muted-foreground font-bold'>Kondisi saat pinjam</p>
                <div className='flex items-center justify-start gap-x-4 mt-1'>
                    <Book className={`w-3 h-3 stroke-primary`} />
                    <p className='text-[12px] text-muted-foreground'>{kondisi}</p>
                </div>
            </main>

            <main className=' mt-4 '>
                <p className='uppercase text-[12px] text-muted-foreground font-bold'>Kondisi saat kembali</p>
                <div className='flex items-center justify-start gap-x-4 mt-1'>
                    <Book className={`w-3 h-3 ${isMissing ? 'stroke-destructive' : 'stroke-primary'}`} />
                    <p className='text-[12px] text-muted-foreground'>{isMissing ? 'Hilang' : keadaanBuku}</p>
                </div>
            </main> 
        </main>


        <main className='w-full mt-4'>
            <p className='uppercase text-[12px] text-muted-foreground font-bold'>anda meminjam buku</p>
            <p className='text-sm font-bold text-primary-foreground hover:underline hover:text-primary cursor-default'>{judulBuku}</p>
        </main>
    </section>
  )
}

export default DetailDisplay