import { useDashboardStore } from '@/providers/dashboard.provider';

import ChartSupportUlitsation from './components/chart-support-utlisation';
import ChartTicketSeverity from './components/chart-ticket-serverity';
import { TicketsOverview } from './components/tickets-overview';
import { DashboardLayout } from './layout';

export function Dashboard() {
  const submissions = useDashboardStore((state) => state.submissions);
  // const dateRange = useDashboardStore((state) => state.dateRange);
  // const dateRangeStr =
  //   dateRange?.from && dateRange.to
  //     ? `${format(dateRange.from, DATETIME_FORMAT)} - ${format(dateRange.to, DATETIME_FORMAT)}`
  //     : '';

  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <p className="text-sm text-muted-foreground">Total tickets</p>
          <p className="text-2xl font-bold">
            {submissions?.length ?? 0} tickets
          </p>
        </div>
        <TicketsOverview className="col-span-8" />
        <ChartSupportUlitsation className="col-span-4" />
        <ChartTicketSeverity className="col-span-3" />
      </div>
    </DashboardLayout>
  );
}
