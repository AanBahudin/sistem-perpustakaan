import { ResponsiveContainer, Pie, PieChart } from "recharts"
import { PieChartIcon } from "lucide-react"

type StatsContainerType = {
    peminjaman: any,
    bukuHilang: any
}

const StatsContainer = ({peminjaman, bukuHilang} : StatsContainerType) => {

    const totalDipinjam = peminjaman.filter((item: any) => item.statusPeminjaman === 'Dipinjam').length
    const totalDikembalikan = peminjaman.filter((item: any) => item.statusPeminjaman === 'Dikembalikan').length
    const totalTerlambat = peminjaman.filter((item: any) => item.statusPeminjaman === 'Terlambat').length
    const totalPengajuan = peminjaman.filter((item: any) => item.statusPeminjaman === 'Diajukan').length
    const totalHilang = bukuHilang.length || 0

    const data02 = [
        { name: 'Dipinjam', value: totalDipinjam, fill: '#2563eb' },  
        { name: 'Diajukkan', value: totalPengajuan, fill: '#737373' },     // biru
        { name: 'Dikembalikan', value: totalDikembalikan, fill: '#14b8a6' },    // hijau
        { name: 'Terlambat', value: totalTerlambat, fill: '#fbbf24' },       // kuning
        { name: 'Hilang', value: totalHilang, fill: '#f87171' }           // merah
    ]

  return (
    <section className='w-4/5 flex items-center border-2 rounded-2xl bg-primary/20'>
        <ResponsiveContainer width={'90%'} className='w-fit min-h-[250px]'>
            <PieChart width={100} height={100}>
            <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label />
            </PieChart>
        </ResponsiveContainer>

        <main className='w-'>
            <PieChartIcon className='border-2 border-primary mb-2 rounded-2xl w-10 h-10 p-2 stroke-primary' />
            <h3 className='font-bold uppercase text-2xl text-primary/90 mb-2'>Statistik</h3>
            <p className='text-[12px] text-muted-foreground'>Statistik pinjaman buku Anda ditampilkan di bawah ini. Lihat proporsi antara buku yang sedang dipinjam, telah dikembalikan, terlambat, atau hilang.</p>

            <div className='flex gap-x-4 items-center mt-4'>
            {data02.map((item:any, index:number) => {
                const bgColor = `${item.fill}33`
                return (
                <p key={index} style={{ 
                    backgroundColor: bgColor,
                    color: item.fill
                }} className='px-4 text-white py-1 rounded-full text-[10px] cursor-default'>{item.name}</p>
                )
            })}
            </div>
        </main>
    </section>
  )
}

export default StatsContainer