"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { platform: "LeetCode", problems: 450, rating: 1650 },
  { platform: "Codeforces", problems: 280, rating: 1420 },
  { platform: "CodeChef", problems: 320, rating: 1580 },
]

const chartConfig = {
  problems: {
    label: "Problems Solved",
    color: "hsl(var(--chart-1))",
  },
  rating: {
    label: "Contest Rating",
    color: "hsl(var(--chart-2))",
  },
}

export function CodingPlatformsChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="platform" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="problems" fill="var(--color-problems)" name="Problems Solved" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
