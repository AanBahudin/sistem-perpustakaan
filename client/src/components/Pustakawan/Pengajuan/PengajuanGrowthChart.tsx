import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';

const PengajuanGrowthChart = ({monthlyPengajuanGrowth} : {monthlyPengajuanGrowth: any}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          <Bar dataKey="perpanjangan" stackId="a" fill="#8884d8" />
          <Bar dataKey="pengembalian" stackId="a" fill="#82ca9d" />
          <Bar dataKey="peminjaman" fill="#ffc658" />
        </BarChart>
    </ResponsiveContainer>
  )
}

export default PengajuanGrowthChart