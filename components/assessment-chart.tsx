"use client"

import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { assessment: "DSA Test 1", score: 85 },
  { assessment: "System Design", score: 78 },
  { assessment: "Programming", score: 92 },
  { assessment: "DSA Test 2", score: 88 },
  { assessment: "Mock Interview", score: 82 },
]

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--chart-1))",
  },
}

export function AssessmentChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[200px]">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="assessment" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area type="monotone" dataKey="score" stroke="var(--color-score)" fill="var(--color-score)" fillOpacity={0.3} />
      </AreaChart>
    </ChartContainer>
  )
}
