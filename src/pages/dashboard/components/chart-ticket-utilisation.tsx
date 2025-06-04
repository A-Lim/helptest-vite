import { useMemo, useState } from 'react';
import { useDashboardStore } from '@/providers/dashboard.provider';
import { eachMonthOfInterval, format } from 'date-fns';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

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

type SupportUtilisationByMonth = {
  monthStr: string;
  month: number;
  year: number;
  manHours: number;
  manDays: number;
};

export default function ChartTicketUtilisation({
  className,
}: React.ComponentProps<'div'>) {
  const [filter, setFilter] = useState('manHours');
  const submissions = useDashboardStore((state) => state.submissions);
  const dateRange = useDashboardStore((state) => state.dateRange);

  const chartData = useMemo(() => {
    const fromDate = dateRange.from;
    const toDate = dateRange.to;

    // generate data based on the start and end date
    const months = eachMonthOfInterval({ start: fromDate, end: toDate });
    const data = months.reduce(
      (acc, date) => {
        const month = date.getMonth();
        const year = date.getFullYear();
        acc[`${month} ${year}`] = {
          monthStr: format(date, 'MMM'),
          month,
          year,
          manHours: 0,
          manDays: 0,
        };

        return acc;
      },
      {} as Record<string, SupportUtilisationByMonth>,
    );

    // populate month with data
    submissions.forEach((submission) => {
      const submittedDate = new Date(submission.sys_SubmittedDate);
      const month = submittedDate.getMonth();
      const year = submittedDate.getFullYear();
      const current = `${month} ${year}`;

      data[current].manHours += +submission.numSupportManHours;
      data[current].manDays += +submission.numSupportManDays;
    });

    // return data as array
    return Object.entries(data).map(([, value]) => value);
  }, [submissions, dateRange]);

  const chartConfig: ChartConfig =
    filter === 'manHours'
      ? {
          manHours: {
            label: 'Man Hours',
          },
        }
      : {
          manDays: {
            label: 'Man Days',
          },
        };

  return (
    <div
      className={cn(
        'w-full h-full bg-card text-card-foreground flex flex-col border rounded-md p-4',
        className,
      )}
    >
      <div className="flex gap-4 justify-between">
        <h3 className="tracking-tight text-sm font-medium">
          Total Ticket Utilisation (
          {filter === 'manHours' ? 'Man Hours' : 'Man Days'})
        </h3>
        <Select value={filter} onValueChange={(e) => setFilter(e)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manHours">Man Hours</SelectItem>
            <SelectItem value="manDays">Man Days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ChartContainer config={chartConfig} className="flex-1">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="monthStr"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
          <Bar
            dataKey={filter}
            fill="var(--primary)"
            radius={8}
            barSize={8}
          ></Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
