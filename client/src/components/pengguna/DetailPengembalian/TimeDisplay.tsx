import { formatMongoTimeToHHMM, formatedDate } from "@/utils/formatDate"

type TimeDisplayType = {
    tanggalPinjam: any,
    tanggalKembali: any
}

const TimeDisplay = ({tanggalPinjam, tanggalKembali} : TimeDisplayType) => {

    let jamPeminjaman = formatMongoTimeToHHMM(tanggalPinjam)
    let jamPengembalian = formatMongoTimeToHHMM(tanggalKembali)
    tanggalPinjam = formatedDate(tanggalPinjam)
    tanggalKembali = formatedDate(tanggalKembali)

    return (
        <main className='w-full flex items-center justify-between gap-x-4'>
            <div className='flex flex-col gap-y-1'>
                <p className='text-muted-foreground text-[12px] font-bold uppercase'>pinjam</p>
                <p className='text-sm text-primary font-bold'>{tanggalPinjam}</p>
                <p className='text-muted-foreground text-[12px]'>Dari {jamPeminjaman}</p>
            </div>

            <div className='flex flex-col gap-y-1'>
                <p className='text-muted-foreground text-[12px] font-bold uppercase'>dikembalikan</p>
                <p className='text-sm text-primary font-bold'>{tanggalKembali}</p>
                <p className='text-muted-foreground text-[12px]'>Sampai {jamPengembalian}</p>
            </div>
        </main>
  )
}

export default TimeDisplay