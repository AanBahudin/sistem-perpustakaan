import { useEffect, useState, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Badge } from '@/components/ui/badge';

// Daftarkan elemen-elemen yang diperlukan
ChartJS.register(ArcElement, Tooltip, Legend);
type KategoriSemuaBukuRatioType = {
    dataRasio: any,
}

const KategoriSemuaBukuRatio = ({dataRasio} : KategoriSemuaBukuRatioType) => {

    const ratioData = dataRasio.map((item: any) => item.jumlahBuku)
    const ratioDataLabel = dataRasio.map((item: any) => item.kategori)

    const getCSSVariable = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const chartRef = useRef(null);
    const [chartColors, setChartColors] = useState<string[]>([]);
  
    useEffect(() => {
        const updateColors = () => {
        const colors = [
            getCSSVariable("--primary-foreground"),
            getCSSVariable("--destructive"),
            getCSSVariable("--chart-1"),
            getCSSVariable("--chart-2"),
            getCSSVariable("--chart-3"),
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
        // const backgroundColor = 
        const donutData = {
            labels: ratioDataLabel,
            datasets: [{
            data: ratioData,
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
        <section className='w-full flex flex-col items-center justify-center'>
            <main className='w-[320px] h-[180px] mt-4 flex items-center justify-center'>
                <Doughnut ref={chartRef} data={donutData} options={options} />
            </main>

            <main className='w-full flex flex-wrap gap-y-2 items-center justify-center gap-x-4 mt-4'>
                {ratioDataLabel.map((item: string, index: number) => {
                    const bgColor = chartColors[index] 
                    return (
                        <Badge key={index} style={{backgroundColor: bgColor}} className='text-white'>{item.slice(0, 10)}...</Badge>
                    )
                })}
            </main>
        </section>
    )
}

export default KategoriSemuaBukuRatio