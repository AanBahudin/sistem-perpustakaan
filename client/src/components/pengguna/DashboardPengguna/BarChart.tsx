import React from 'react'
import { ChartContainer } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid } from "recharts"

type BarCharProps = {
    chartConfig: any,
    chartData: any
}

const BarChartComponent = ({chartData, chartConfig} : BarCharProps) => {
  return (
    <ChartContainer config={chartConfig} className="h-[100px] w-full">
        <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        </BarChart>
    </ChartContainer>
  )
}

export default BarChartComponent