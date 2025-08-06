import { useEffect, useState, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Daftarkan elemen-elemen yang diperlukan
ChartJS.register(ArcElement, Tooltip, Legend);

const UserRatioDougnut = () => {

    const getCSSVariable = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const chartRef = useRef(null);
    const [chartColors, setChartColors] = useState<string[]>([]);
  
    useEffect(() => {
      const updateColors = () => {
        const colors = [
          getCSSVariable("--primary"),
          getCSSVariable("--destructive"),
          getCSSVariable("--chart-4"),
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
  
  
    const label = ["Aktif", "Nonaktif", "Pending"]
        // const backgroundColor = 
        const donutData = {
            labels: label,
            datasets: [{
            data: [300, 50, 100],
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

    return (
        <>
            <div className='w-[320px] h-[180px] mt-4 flex items-center justify-center'>
              <Doughnut ref={chartRef} data={donutData} options={options} />
            </div>

            <div className='w-full flex items-center justify-center gap-x-4 mt-4'>
                {label.map((item: string, index: number) => {
                  const bgColor = chartColors[index] 
                  return (
                    <p style={{backgroundColor: bgColor, opacity: 0.9}} className={`bg-[${bgColor}] text-white min-w-20 text-center rounded-full py-1 text-xs`} key={index}>{item}</p>
                  )
                })}
            </div>
        </>
    )
}

export default UserRatioDougnut