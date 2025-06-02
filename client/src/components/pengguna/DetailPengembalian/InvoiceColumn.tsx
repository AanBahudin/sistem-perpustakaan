import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Calendar } from 'lucide-react'

const InvoiceColumn = () => {
  return (
    <section className="rounded-2xl h-fit p-6 col-span-4 border">
        <h1 className='font-bold uppercase'>Detail summary</h1>

        <main className='bg-popover rounded-lg p-4 my-4'>
            <main className='w-full flex items-center justify-between gap-x-4'>
                <div className='flex flex-col gap-y-1'>
                    <p className='text-muted-foreground text-[12px] font-bold uppercase'>pinjam</p>
                    <p className='text-sm text-primary font-bold'>Minggu, 22 May 2020</p>
                    <p className='text-muted-foreground text-[12px]'>dari 17.00</p>
                </div>

                <div className='flex flex-col gap-y-1'>
                    <p className='text-muted-foreground text-[12px] font-bold uppercase'>dikembalikan</p>
                    <p className='text-sm text-primary font-bold'>Minggu, 22 May 2020</p>
                    <p className='text-muted-foreground text-[12px]'>dari 17.00</p>
                </div>
            </main>

            <main className='w-full mt-4'>
                <p className='uppercase text-[12px] text-muted-foreground font-bold'>total hari peminjaman</p>
                <div className='flex items-center justify-start gap-x-4 mt-1'>
                    <Calendar className='w-3 h-3 stroke-primary' />
                    <p className='text-[12px] text-muted-foreground'>12 Hari</p>
                </div>
            </main>

            <main className='w-full mt-4'>
                <p className='uppercase text-[12px] text-muted-foreground font-bold'>total hari keterlambatan</p>
                <div className='flex items-center justify-start gap-x-4 mt-1'>
                    <Calendar className='w-3 h-3 stroke-destructive' />
                    <p className='text-[12px] text-muted-foreground'>12 Hari</p>
                </div>
            </main>

            <main className='w-full mt-4'>
                <p className='uppercase text-[12px] text-muted-foreground font-bold'>anda meminjam buku</p>
                <p className='text-sm font-bold text-primary-foreground hover:underline hover:text-primary cursor-default'>Mastering React</p>
            </main>

            {/* <Separator className='my-10' /> */}
        </main>

        <main className='w-full'>
            <h1 className='font-bold uppercase'>Rincian Denda</h1>

            <div className='w-full flex flex-col gap-y-2 mt-2 text-muted-foreground text-[12px] capitalize'>
                <div className='flex items-center justify-between'>
                    <p>Keterlambatan</p>
                    <p>IDR. 1000 (x4 hari)</p>
                </div>

                <div className='flex items-center justify-between'>
                    <p>denda fisik</p>
                    <p>IDR. 1000</p>
                </div>

                <div className='flex items-center justify-between'>
                    <p>denda kehilangan</p>
                    <p>IDR. 1000</p>
                </div>
                <Separator />
                <div className='flex items-center justify-between text-lg font-bold text-primary'>
                    <p className='text-lg font-bold text-primary'>Total</p>
                    <p>IDR. 1000</p>
                </div>
            </div>

            <Button disabled className='my-4 w-full text-center text-white'>Sudah Dibayar</Button>
        </main>

    </section>
  )
}

export default InvoiceColumn