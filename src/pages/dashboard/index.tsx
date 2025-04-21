import { DATETIME_FORMAT } from '@/constants';
import { useDashboardStore } from '@/providers/dashboard.provider';
import { format } from 'date-fns';

import { TicketsOverview } from './components/tickets-overview';
import { DashboardLayout } from './layout';

export function Dashboard() {
  const submissions = useDashboardStore((state) => state.submissions);
  const dateRange = useDashboardStore((state) => state.dateRange);
  const dateRangeStr =
    dateRange?.from && dateRange.to
      ? `${format(dateRange.from, DATETIME_FORMAT)} - ${format(dateRange.to, DATETIME_FORMAT)}`
      : '';

  return (
    <DashboardLayout>
      <div className="space-y-4 flex justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Total tickets</p>
          <p className="text-2xl font-bold">
            {submissions?.length ?? 0} tickets
          </p>
        </div>
        <div>
          <p className="ml-4 text-sm text-muted-foreground">{dateRangeStr}</p>
          <TicketsOverview className="min-w-4xl" />
        </div>
      </div>
    </DashboardLayout>
  );
}
