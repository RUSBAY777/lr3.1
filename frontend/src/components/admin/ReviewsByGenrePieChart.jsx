import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartCard } from "../charts/ChartCard";
import { ChartTooltip } from "../charts/ChartTooltip";
import { getChartPalette } from "../../utils/cssVars";

export function ReviewsByGenrePieChart({ data }) {
  const palette = getChartPalette();

  return (
    <ChartCard title="Распределение обзоров по жанрам (круговая)">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="count" nameKey="genre" outerRadius={110} label>
            {data.map((entry, index) => (
              <Cell key={entry.genre} fill={palette[index % palette.length]} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
