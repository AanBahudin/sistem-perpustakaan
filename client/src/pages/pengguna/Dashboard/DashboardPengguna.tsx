import Container from '../../../globals/Container'
import SummaryCard from '@/components/pengguna/Dashboard Pengguna/SummaryCard'
import LoanOverview from '@/components/pengguna/Dashboard Pengguna/LoanOverview'
import { useQuery } from '@tanstack/react-query'
import { getStats } from '@/actions/userActions'
import { PieChart, Pie, ResponsiveContainer } from 'recharts'
import { PieChartIcon } from 'lucide-react'
import CalendarPengguna from '@/components/pengguna/Dashboard Pengguna/CalendarUser'

const KatalogPengguna = () => {

  const {data: statsData, isLoading} = useQuery({
    queryKey: ['stats', 'pengguna'],
    queryFn: getStats
  })

  if (isLoading) {
    return <h1>Loading .... </h1>
  }

  const data02 = [
  { name: 'Dipinjam', value: 12, fill: '#2563eb' },       // biru
  { name: 'Dikembalikan', value: 8, fill: '#14b8a6' },    // hijau
  { name: 'Terlambat', value: 3, fill: '#fbbf24' },       // kuning
  { name: 'Hilang', value: 1, fill: '#f87171' }           // merah
]

  const {peminjaman, peminjamanAktif, perpanjangan, pengembalian, summaryData} = statsData

  return (
    <Container className='my-16'>
      <section className='flex '>
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
                  }} className={`px-4 text-white py-1 rounded-full text-[10px]`}>{item.name}</p>
                )
              })}
            </div>
          </main>
        </section>

        <CalendarPengguna />
      </section>



      <SummaryCard data={summaryData} />
      <LoanOverview peminjaman={peminjaman} perpanjangan={perpanjangan} pengembalian={pengembalian} peminjamanAktif={peminjamanAktif} />
    </Container>
  )
}

export default KatalogPengguna