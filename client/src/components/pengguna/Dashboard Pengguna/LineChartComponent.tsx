import React from 'react'
import {chartConfig, chartData} from '@/utils/constants'
import { ChartContainer } from '@/components/ui/chart'
import { Line, LineChart, CartesianGrid } from "recharts"

const LineChartComponent = () => {
  return (
    <ChartContainer config={chartConfig} className="h-[100px] w-full">
        <LineChart data={chartData}>
            <CartesianGrid vertical={false} />
            <Line dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        </LineChart>
    </ChartContainer>
  )
}

export default LineChartComponent