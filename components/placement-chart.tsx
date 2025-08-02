"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", placed: 12, inProcess: 8 },
  { month: "Feb", placed: 18, inProcess: 15 },
  { month: "Mar", placed: 25, inProcess: 12 },
  { month: "Apr", placed: 32, inProcess: 18 },
  { month: "May", placed: 28, inProcess: 10 },
  { month: "Jun", placed: 35, inProcess: 22 },
]

const chartConfig = {
  placed: {
    label: "Placed",
    color: "hsl(var(--chart-1))",
  },
  inProcess: {
    label: "In Process",
    color: "hsl(var(--chart-2))",
  },
}

export function PlacementChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="placed" fill="var(--color-placed)" />
        <Bar dataKey="inProcess" fill="var(--color-inProcess)" />
      </BarChart>
    </ChartContainer>
  )
}
