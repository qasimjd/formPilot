"use client"

import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent
} from "./chart";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line
} from "recharts";

function ChartClient({ chartData, chartConfig, iconMap }: any) {
  return (
    <ChartContainer config={chartConfig} className="h-72 w-full">
      <LineChart data={chartData} width={600} height={300} style={{ width: '100%', height: '100%' }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <ChartTooltip />
        <Line type="monotone" dataKey="forms" stroke={chartConfig.forms.color} strokeWidth={2} dot={{ r: 4 }} name={chartConfig.forms.label} />
        <Line type="monotone" dataKey="responses" stroke={chartConfig.responses.color} strokeWidth={2} dot={{ r: 4 }} name={chartConfig.responses.label} />
        <ChartLegend content={(props: any) => <ChartLegendContent {...props} iconMap={iconMap} />} />
      </LineChart>
    </ChartContainer>
  );
}

export default ChartClient;
