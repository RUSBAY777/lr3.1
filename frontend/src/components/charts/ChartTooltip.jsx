import { getChartTheme } from "../../utils/cssVars";

export function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const theme = getChartTheme();
  return (
    <div
      className="chart-tooltip"
      style={{
        background: theme.tooltipBg,
        border: `1px solid ${theme.tooltipBorder}`,
        color: theme.tooltipLabel,
        padding: "0.5rem 0.75rem",
        borderRadius: 8
      }}
    >
      {label && <div style={{ marginBottom: 4 }}>{label}</div>}
      {payload.map((entry) => (
        <div key={entry.name}>{`${entry.name}: ${entry.value}`}</div>
      ))}
    </div>
  );
}
