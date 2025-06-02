import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatRupiah } from '@/utils/formatCurrency'
import { formatedDate, formatMongoTimeToHHMM } from '@/utils/formatDate'
import { Book, Calendar } from 'lucide-react'

type InvoiceColumnType = {
    dataPinjaman: any,
    dataPengembalian: any
}

const InvoiceColumn = ({dataPinjaman, dataPengembalian} : InvoiceColumnType) => {

    let {createdAt: tanggalPeminjaman, durasiPeminjaman, kondisi} = dataPinjaman
    let {createdAt: tanggalPengembalian, durasiKeterlambatan, judulBuku, dendaFisik, keadaanBuku, statusPembayaran, dendaKeterlambatan, totalDenda, isMissing, dendaKehilangan} = dataPengembalian

    let jamPeminjaman = formatMongoTimeToHHMM(tanggalPeminjaman)
    let jamPengembalian = formatMongoTimeToHHMM(tanggalPengembalian)
    tanggalPeminjaman = formatedDate(tanggalPeminjaman)
    tanggalPengembalian = formatedDate(tanggalPengembalian)

  return (
    <section className="rounded-2xl h-fit p-6 col-span-4 border">
        <h1 className='font-bold uppercase'>Detail summary</h1>

        <main className='bg-popover rounded-lg p-4 my-4'>
            <main className='w-full flex items-center justify-between gap-x-4'>
                <div className='flex flex-col gap-y-1'>
                    <p className='text-muted-foreground text-[12px] font-bold uppercase'>pinjam</p>
                    <p className='text-sm text-primary font-bold'>{tanggalPeminjaman}</p>
                    <p className='text-muted-foreground text-[12px]'>Dari {jamPeminjaman}</p>
                </div>

                <div className='flex flex-col gap-y-1'>
                    <p className='text-muted-foreground text-[12px] font-bold uppercase'>dikembalikan</p>
                    <p className='text-sm text-primary font-bold'>{tanggalPengembalian}</p>
                    <p className='text-muted-foreground text-[12px]'>Sampai {jamPengembalian}</p>
                </div>
            </main>

            <main className='w-full mt-4'>
                <p className='uppercase text-[12px] text-muted-foreground font-bold'>total hari peminjaman</p>
                <div className='flex items-center justify-start gap-x-4 mt-1'>
                    <Calendar className='w-3 h-3 stroke-primary' />
                    <p className='text-[12px] text-muted-foreground'>{durasiPeminjaman} Hari</p>
                </div>
            </main>

            <main className='w-full mt-4'>
                <p className='uppercase text-[12px] text-muted-foreground font-bold'>total hari keterlambatan</p>
                <div className='flex items-center justify-start gap-x-4 mt-1'>
                    <Calendar className='w-3 h-3 stroke-destructive' />
                    <p className='text-[12px] text-muted-foreground'>{durasiKeterlambatan} Hari</p>
                </div>
            </main>

            <main className='w-full flex items-center justify-between'>
                <main className=' mt-4'>
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

            {/* <Separator className='my-10' /> */}
        </main>

        <main className='w-full'>
            <h1 className='font-bold uppercase'>Rincian Denda</h1>

            <div className='w-full flex flex-col gap-y-2 mt-2 text-muted-foreground text-[12px] capitalize'>
                <div className='flex items-center justify-between'>
                    <p>Keterlambatan</p>
                    <p>{formatRupiah(dendaKeterlambatan)} (x {durasiKeterlambatan} hari)</p>
                </div>

                <div className='flex items-center justify-between'>
                    <p>denda fisik</p>
                    <p>{formatRupiah(dendaFisik)}</p>
                </div>

                <div className='flex items-center justify-between'>
                    <p>denda kehilangan</p>
                    <p>{isMissing ? formatRupiah(dendaKehilangan) : '-'}</p>
                </div>
                <Separator />
                <div className='flex items-center justify-between text-lg font-bold text-primary'>
                    <p className='text-lg font-bold text-primary'>Total</p>
                    <p>{formatRupiah(totalDenda)}</p>
                </div>
            </div>

            <Button variant={statusPembayaran === 'Dibayar' ? 'default' : 'secondary'} disabled className='my-4 w-full text-center text-white'>{statusPembayaran}</Button>
        </main>

    </section>
  )
}

export default InvoiceColumn