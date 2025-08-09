import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';

const PengajuanGrowthChart = ({monthlyPengajuanGrowth} : {monthlyPengajuanGrowth: any}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
        <BarChart
          className='text-xs capitalize'
          width={500}
          height={300}
          data={monthlyPengajuanGrowth}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="bulan" />
          <YAxis />
          <Legend />
          <Bar dataKey="perpanjangan" stackId="a" fill="#155DFC" />
          <Bar dataKey="pengembalian" stackId="a" fill="#FFB900" />
          <Bar dataKey="peminjaman" fill="#FF6467" />
        </BarChart>
    </ResponsiveContainer>
  )
}

export default PengajuanGrowthChart