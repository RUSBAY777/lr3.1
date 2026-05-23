const CHART_PALETTE_KEYS = [
  "--chart-palette-1",
  "--chart-palette-2",
  "--chart-palette-3",
  "--chart-palette-4",
  "--chart-palette-5",
  "--chart-palette-6"
];

export function getCssVar(name, fallback = "") {
  if (typeof document === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

export function getChartPalette() {
  return CHART_PALETTE_KEYS.map((key) => getCssVar(key));
}

export function getChartTheme() {
  return {
    grid: getCssVar("--chart-grid"),
    axis: getCssVar("--muted"),
    tooltipBg: getCssVar("--chart-tooltip-bg"),
    tooltipBorder: getCssVar("--chart-tooltip-border"),
    tooltipLabel: getCssVar("--text"),
    barPrimary: getCssVar("--chart-palette-1"),
    barSecondary: getCssVar("--chart-palette-2"),
    palette: getChartPalette()
  };
}
