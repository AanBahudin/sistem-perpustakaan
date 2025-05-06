import { CartesianGrid, Line, LineChart } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"


const PenggunaCharts = () => {

    const chartData = [
        { month: "January", desktop: 186, mobile: 80 },
        { month: "February", desktop: 305, mobile: 200 },
        { month: "March", desktop: 237, mobile: 120 },
        { month: "April", desktop: 73, mobile: 190 },
        { month: "May", desktop: 209, mobile: 130 },
        { month: "June", desktop: 214, mobile: 140 },
    ]
       
    const chartConfig = {
        desktop: {
          label: "Desktop",
          color: "#2563eb",
        },
        mobile: {
          label: "Mobile",
          color: "#60a5fa",
        },
    } satisfies ChartConfig

    return (
        <div className='w-1/3 border bg-card rounded-xl p-6'>
            <h3>Total Denda</h3>
            <h1 className='text-2xl mt-4 font-semibold text-white'>IDR 150.000</h1>
            <p className='text-muted-foreground text-sm mb-6'>+20.1% dari pengembalian terakhir</p>

            <ChartContainer config={chartConfig} className="h-[100px] w-full">
                <LineChart data={chartData}>
                    <CartesianGrid vertical={false} />
                    <Line dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                </LineChart>
            </ChartContainer>
        </div>
        
    )
}

export default PenggunaCharts