import { Label, Pie, PieChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export type ChartSummaryData = {
  label: string;
  tooltip: string;
  fill: string;
  count: number;
};

export default function ChartSummary({
  unit,
  tooltipTitle,
  data,
}: React.ComponentProps<'div'> & {
  data: ChartSummaryData[];
  tooltipTitle: string;
  unit: string;
}) {
  const total = data.reduce((total, item) => {
    total += item.count;
    return total;
  }, 0);

  const chartConfig = {
    count: {
      label: tooltipTitle,
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="size-18 z-50">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Pie
          data={data}
          dataKey="count"
          nameKey="tooltip"
          innerRadius={30}
          outerRadius={35}
          paddingAngle={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 8}
                      className="fill-foreground text-base font-bold"
                    >
                      {total.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 12}
                      className="fill-muted-foreground text-xs"
                    >
                      {unit}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
