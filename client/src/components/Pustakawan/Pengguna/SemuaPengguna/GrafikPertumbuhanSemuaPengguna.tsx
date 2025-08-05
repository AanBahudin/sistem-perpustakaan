import { AlignEndHorizontal, Ratio } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Daftarkan elemen-elemen yang diperlukan
ChartJS.register(ArcElement, Tooltip, Legend);

const GrafikPertumbuhanSemuaPengguna = () => {

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const label = ['Aktif', 'Pending', 'Nonaktif']
  const backgroundColor = ['#4ade80', '#facc15', '#f87171']
  
  const donutData = {
    labels: label,
    datasets: [
      {
        label: 'Jumlah Pengguna',
        data: [45, 25, 10],
        backgroundColor: backgroundColor, // hijau, kuning, merah
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '40%', // untuk efek donut
    plugins: {
      legend: {
        display: false,
        position: 'bottom' as const,
      },
    },
  };

  return (
    <section className="w-full border rounded-2xl bg-transparent h-[40vh] p-3 flex items-start justify-center">
        <main className="w-[70%] border-r h-full flex flex-col justify-between gap-y-5 items-start">
            <h1 className="font-semibold text-lg flex items-center gap-x-4 px-6">
              <AlignEndHorizontal className='w-4 h-4 stroke-muted-foreground' /> 
              Statistik Pertumbuhan Pengguna Bulanan
            </h1>
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                {/* <CartesianGrid strokeDasharray="2 2" /> */}
                <XAxis dataKey="name" className='text-xs ' />
                <YAxis className='text-xs' />
                <Area type="monotone" dataKey="uv" fill='#155DFC' className='stroke-[#155DFC]' />
              </AreaChart>
          </ResponsiveContainer>
        </main>

        <main className="flex-1 max-h-full flex flex-col items-center justify-center">
            <h1 className='font-semibold items-center flex gap-x-4'>
              <Ratio  className='w-4 h-4 stroke-muted-foreground' /> 
              Rasio Aktivasi Akun
            </h1>

            <div className='w-[320px] h-[180px] mt-4 flex items-center justify-center'>
              <Doughnut data={donutData} options={options} />
            </div>

            <div className='w-full flex items-center justify-center gap-x-4 mt-4'>
                {label.map((item: string, index: number) => {
                  const bgColor = backgroundColor[index] 
                  return (
                    <p style={{backgroundColor: bgColor, opacity: 0.9}} className={`bg-[${bgColor}] min-w-20 text-center rounded-full py-1 text-xs`} key={index}>{item}</p>
                  )
                })}
            </div>
        </main>
    </section>
  )
}

export default GrafikPertumbuhanSemuaPengguna