import { useEffect, useState, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Badge } from '@/components/ui/badge';

// Daftarkan elemen-elemen yang diperlukan
ChartJS.register(ArcElement, Tooltip, Legend);

const SinglePenggunaDougnut = ({userAccountStatusRatio} : {userAccountStatusRatio: any}) => {

  const totalData = userAccountStatusRatio.reduce((acc: number, current: number) => acc + current, 0);
  
  const getCSSVariable = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const chartRef = useRef(null);
  const [chartColors, setChartColors] = useState<string[]>([]);

  useEffect(() => {
    const updateColors = () => {
      const colors = [
        getCSSVariable("--primary"),
        getCSSVariable("--destructive"),
        getCSSVariable("--chart-4"),
        getCSSVariable("--chart-3"),
    ];
    setChartColors(colors);
  };

  updateColors();

  // Pantau perubahan theme (misal class "dark" ditambah/diubah)
  const observer = new MutationObserver(updateColors);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

    return () => observer.disconnect();
  }, []);


  const label = ["Peminjaman", "Perpanjangan", "Pengembalian", "Buku Dihilangkan", "Total Data"]
    // const backgroundColor = 
    const donutData = {
        labels: ["Peminjaman", "Perpanjangan", "Pengembalian", "Buku Dihilangkan", "Total Data"],
        datasets: [{
        data: userAccountStatusRatio,
        backgroundColor: chartColors,
        borderWidth: 0,
    },],
  };

  const options = {
    responsive: true,
    cutout: "60%",
    plugins: {
      legend: {
          display: false,
      },
    },
  };

  const newDataForBadge = [...userAccountStatusRatio, totalData]

  return (
      <section className='w-full flex items-center justify-between'>
        {totalData === 0 ? (
          <h1 className='text-center text-xs text-muted-foreground'>Belum ada aktivitas terbaru</h1>
        ) : (
          <main className='w-[250px] h-[180px] mt-4 flex items-center justify-center'>
            <Doughnut ref={chartRef} data={donutData} options={options} />
          </main>
        )}

          <main className='w-[70%] gap-x-8 h-full flex flex-col items-center justify-between'>
              <p className='text-xs text-muted-foreground'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione iure asperiores officia beatae ad, suscipit sunt, voluptatum voluptate quo aspernatur animi soluta doloribus culpa a est, nisi quas nemo dolore voluptatibus! Consectetur ut voluptatum in impedit reiciendis officiis dolores rem.</p>
              <main className='w-full flex flex-1 gap-2 flex-wrap items-start justify-start gap-x-4 mt-4'>
                  {label.map((item: string, index: number) => {
                    const bgColor = chartColors[index] 
                    return (
                        <Badge key={index} style={{backgroundColor: bgColor}} className='text-white'>{newDataForBadge[index]} {item}</Badge>
                    )
                  })}
              </main>
          </main>
      </section>
  )
}

export default SinglePenggunaDougnut