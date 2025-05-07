import BarChartComponent from "./BarChart"
import {chartConfig, chartData} from '@/utils/constants'

const PenggunaBarChart = () => {
    return (
        <div className='w-2/3 border rounded-xl bg-card p-6'>
            <h3>Peminjaman</h3>

            <h1 className='text-2xl mt-4 font-semibold text-white'>+12 Peminjaman</h1>
            <p className='text-muted-foreground text-sm mb-6'>1 Peminjaman lebih banyak</p>

            <BarChartComponent chartConfig={chartConfig} chartData={chartData} />
            
        </div>
    )
}

export default PenggunaBarChart