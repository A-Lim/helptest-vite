import { useMemo } from 'react';
import { SEVERITY } from '@/constants';
import { useDashboardStore } from '@/providers/dashboard.provider';
import { Label, Pie, PieChart } from 'recharts';

import { cn } from '@/lib/utils';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export default function ChartTicketSeverity({
  className,
}: React.ComponentProps<'div'>) {
  const submissions = useDashboardStore((state) => state.submissions);

  const chartData = useMemo(() => {
    const initialData = Object.entries(SEVERITY).map(([key, value]) => ({
      severity: value,
      label: value,
      fill: `var(--severity-${key})`,
      count: 0,
    }));

    submissions?.forEach((submission) => {
      const index = parseInt(submission.rdbSeverityLevel) - 1;
      initialData[index].count += 1;
    });

    return initialData;
  }, [submissions]);

  const chartConfig = {
    count: {
      label: 'No. of tickets',
    },
  } satisfies ChartConfig;

  return (
    <div
      className={cn(
        'bg-card text-card-foreground flex flex-col shadow-sm border rounded-md p-4',
        className,
      )}
    >
      <h3 className="tracking-tight text-sm font-medium">
        Tickets by Severity
      </h3>
      <div className="grid grid-cols-6 flex-1">
        <div className="col-span-4">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="severity"
                innerRadius={60}
                outerRadius={80}
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
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {(submissions?.length ?? 0).toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Tickets
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>

        <div className="flex items-center text-xs text-muted-foreground col-span-2">
          <table className="w-full">
            <tbody>
              {chartData.map((row, index) => (
                <tr key={index}>
                  <td className="pb-1">
                    <div
                      className="size-3"
                      style={{ backgroundColor: row.fill }}
                    ></div>
                  </td>
                  <td className="pb-1">{row.label}</td>
                  <td className="pb-1">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
