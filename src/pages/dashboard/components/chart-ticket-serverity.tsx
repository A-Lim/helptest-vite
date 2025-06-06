import { useMemo, useState } from 'react';
import { SEVERITY_COLOR } from '@/constants';
import { useDashboardStore } from '@/providers/dashboard.provider';
import { Label, Pie, PieChart } from 'recharts';

import { cn } from '@/lib/utils';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type FilterType = 'contract-period' | 'current-month';

export default function ChartTicketSeverity({
  className,
}: React.ComponentProps<'div'>) {
  const [filter, setFilter] = useState<FilterType>('contract-period');
  const submissions = useDashboardStore((state) => state.submissions);

  const { chartData, total } = useMemo(() => {
    let total = 0;
    const currentMonth = new Date().getMonth();

    const initialData = Object.entries(SEVERITY_COLOR).map(([key, value]) => ({
      severity: key,
      label: key,
      fill: value,
      count: 0,
    }));

    submissions.forEach((submission) => {
      const submittedDate = new Date(submission.sys_SubmittedDate);

      if (filter === 'current-month') {
        if (currentMonth === submittedDate.getMonth()) {
          total += 1;
          const index = parseInt(submission.rdbSeverityLevel) - 1;
          initialData[index].count += 1;
        }
      } else {
        total += 1;
        const index = parseInt(submission.rdbSeverityLevel) - 1;
        initialData[index].count += 1;
      }
    });

    return { chartData: initialData, total };
  }, [submissions, filter]);

  const chartConfig = {
    count: {
      label: 'No. of tickets',
    },
  } satisfies ChartConfig;

  return (
    <div
      className={cn(
        'bg-card text-card-foreground flex flex-col border rounded-md p-4',
        className,
      )}
    >
      <div className="flex gap-4 justify-between">
        <h3 className="tracking-tight text-sm font-medium">
          Tickets by Severity
        </h3>
        <Select
          value={filter}
          onValueChange={(e) => setFilter(e as FilterType)}
        >
          <SelectTrigger className="w-[155px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="contract-period">Contract Period</SelectItem>
            <SelectItem value="current-month">Current Month</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
                            {total.toLocaleString()}
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
