import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { ChartCard } from "../charts/ChartCard";
import { ChartTooltip } from "../charts/ChartTooltip";
import { getChartTheme } from "../../utils/cssVars";

export function ReviewsByMonthChart({ data }) {
  const theme = getChartTheme();

  return (
    <ChartCard title="Активность по месяцам (последние 6 месяцев)" height={300}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} />
          <XAxis dataKey="month" stroke={theme.axis} />
          <YAxis stroke={theme.axis} allowDecimals={false} />
          <Tooltip content={<ChartTooltip />} />
          <Bar dataKey="count" name="Обзоров" fill={theme.barSecondary} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
