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
        <ChartContainer config={chartConfig} className="h-[100px] w-full">
            <LineChart data={chartData}>
                <CartesianGrid vertical={false} />
                <Line dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            </LineChart>
        </ChartContainer>
    )
}

export default PenggunaCharts