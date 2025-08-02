"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { week: "Week 1", problems: 15 },
  { week: "Week 2", problems: 28 },
  { week: "Week 3", problems: 42 },
  { week: "Week 4", problems: 58 },
  { week: "Week 5", problems: 75 },
  { week: "Week 6", problems: 92 },
  { week: "Week 7", problems: 108 },
  { week: "Week 8", problems: 125 },
]

const chartConfig = {
  problems: {
    label: "Problems Solved",
    color: "hsl(var(--chart-1))",
  },
}

export function ProgressChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[200px]">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="problems"
          stroke="var(--color-problems)"
          strokeWidth={2}
          dot={{ fill: "var(--color-problems)" }}
        />
      </LineChart>
    </ChartContainer>
  )
}
