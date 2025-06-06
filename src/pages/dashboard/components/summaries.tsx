import { useMemo } from 'react';
import { useDashboardStore } from '@/providers/dashboard.provider';

import { cn } from '@/lib/utils';

import { BalanceSummary } from './balance-summary';
import { ClosedTicketSummary } from './closed-tickets-summary';

export function Summaries({ className }: React.ComponentProps<'div'>) {
  const submissions = useDashboardStore((state) => state.submissions);
  const closedSubmissions = useMemo(() => {
    return submissions.filter(
      (submission) => submission.sys_Status === 'Closed',
    );
  }, [submissions]);
  return (
    <div
      className={cn(
        'w-full h-full bg-card text-card-foreground flex flex-col border rounded-md p-4',
        className,
      )}
    >
      <div className="divide-y h-full">
        <ClosedTicketSummary
          submissions={closedSubmissions}
          className="h-1/3"
        />
        <BalanceSummary
          type="man-days"
          submissions={closedSubmissions}
          className="h-1/3"
        />
        <BalanceSummary
          type="man-hours"
          submissions={closedSubmissions}
          className="h-1/3"
        />
      </div>
    </div>
  );
}
