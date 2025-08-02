"use client"

import { PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Computer Science", value: 45, color: "#0088FE" },
  { name: "Information Technology", value: 30, color: "#00C49F" },
  { name: "Electronics", value: 15, color: "#FFBB28" },
  { name: "Mechanical", value: 10, color: "#FF8042" },
]

const chartConfig = {
  value: {
    label: "Students",
  },
}

export function DepartmentChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ChartContainer>
  )
}
