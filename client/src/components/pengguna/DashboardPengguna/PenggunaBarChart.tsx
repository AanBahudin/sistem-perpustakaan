import { Bar, BarChart, CartesianGrid } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const PenggunaBarChart = () => {

    const chartData = [
            { month: "January", desktop: 186, mobile: 80 },
            { month: "February", desktop: 305, mobile: 200 },
            { month: "March", desktop: 237, mobile: 120 },
            { month: "April", desktop: 73, mobile: 190 },
            { month: "May", desktop: 209, mobile: 130 },
            { month: "June", desktop: 214, mobile: 140 },
            { month: "March", desktop: 237, mobile: 120 },
            { month: "April", desktop: 73, mobile: 190 },
            { month: "May", desktop: 209, mobile: 130 },
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
        <div className='w-2/3 border rounded-xl bg-card p-6'>
          <h3>Peminjaman</h3>

          <h1 className='text-2xl mt-4 font-semibold text-white'>+12 Peminjaman</h1>
          <p className='text-muted-foreground text-sm mb-6'>1 Peminjaman lebih banyak</p>

            <ChartContainer config={chartConfig} className="h-[100px] w-full">
                <BarChart data={chartData}>
                    <CartesianGrid vertical={false} />
                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}

export default PenggunaBarChart