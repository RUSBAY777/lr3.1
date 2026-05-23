import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { ChartCard } from "../charts/ChartCard";
import { ChartTooltip } from "../charts/ChartTooltip";
import { getChartTheme } from "../../utils/cssVars";

export function ReviewsByGenreBarChart({ data }) {
  const theme = getChartTheme();

  return (
    <ChartCard title="Обзоры по жанрам игр">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} />
          <XAxis dataKey="genre" stroke={theme.axis} />
          <YAxis stroke={theme.axis} allowDecimals={false} />
          <Tooltip content={<ChartTooltip />} />
          <Legend />
          <Bar dataKey="count" name="Обзоров" fill={theme.barPrimary} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
