import DetailDataDisplay from "../Detail Pengembalian/DetailDataDisplay"
import { Book, Calendar, CalendarPlus } from "lucide-react"


type PerpanjanganDetailDisplay = {
    perpanjangan: any,
    peminjaman: any
}

const PerpanjanganDetailDisplay = ({perpanjangan, peminjaman} : PerpanjanganDetailDisplay) => {

    const {durasiPeminjaman, kondisi, buku} = peminjaman
    const {durasi, alasan} = perpanjangan

    return (
        <section>
            <DetailDataDisplay title="total hari peminjaman" value={`${durasiPeminjaman} hari`} Icon={Calendar} />
            <DetailDataDisplay title="jumlah hari perpanjangan yang di ajukan" value={`${durasi} hari`} Icon={CalendarPlus}/>

            <main className='mt-4'>
                <p className='uppercase text-[12px] text-muted-foreground font-bold'>Kondisi saat pinjam</p>
                <div className='flex items-center justify-start gap-x-4 mt-1'>
                    <Book className={`w-3 h-3 stroke-primary`} />
                    <p className='text-[12px] text-muted-foreground'>{kondisi}</p>
                </div>
            </main>

            <main className='w-full mt-4'>
                <p className='uppercase text-[12px] text-muted-foreground font-bold'>anda meminjam buku</p>
                <p className='text-sm font-bold text-primary-foreground hover:underline hover:text-primary cursor-default'>{buku.judul}</p>
            </main>

            <main className='w-full mt-4'>
                <p className='uppercase text-[12px] text-muted-foreground font-bold'>alasan</p>
                <div className="w-full rounded-lg border p-4 mt-4 h-[160px] overflow-y-scroll scroll-custom">
                    <p className='text-sm text-muted-foreground bg-popover cursor-default'>{alasan}</p>
                </div>
            </main>
        </section>
    )
}

export default PerpanjanganDetailDisplay