import { Button } from '@/components/ui/button'
import TimeDisplay from './TimeDisplay'
import DetailDisplay from './DetailDisplay'
import FineDetail from './FineDetail'

type InvoiceColumnType = {
    dataPinjaman: any,
    dataPengembalian: any
}

const InvoiceColumn = ({dataPinjaman, dataPengembalian} : InvoiceColumnType) => {

    let {createdAt: tanggalPeminjaman} = dataPinjaman
    let {createdAt: tanggalPengembalian, statusPembayaran} = dataPengembalian
    

  return (
    <section className="rounded-2xl h-fit p-6 col-span-4 border">
        <h1 className='font-bold uppercase'>Detail summary</h1>

        <main className='bg-popover rounded-lg p-4 my-4'>
            <TimeDisplay tanggalPinjam={tanggalPeminjaman} tanggalKembali={tanggalPengembalian} />
            <DetailDisplay peminjaman={dataPinjaman} pengembalian={dataPengembalian} />
        </main> 

        <main className='w-full'>
            <h1 className='font-bold uppercase'>Rincian Denda</h1>
            <FineDetail pengembalian={dataPengembalian} />
            <Button variant={statusPembayaran === 'Dibayar' ? 'default' : 'secondary'} disabled className='my-4 w-full text-center text-white'>{statusPembayaran}</Button>
        </main>

    </section>
  )
}

export default InvoiceColumn