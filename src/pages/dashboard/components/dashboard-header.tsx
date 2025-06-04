import { useMemo } from 'react';
import { DATE_FORMAT } from '@/constants';
import { useDashboardStore } from '@/providers/dashboard.provider';
import { differenceInDays, format, intervalToDuration } from 'date-fns';

import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

export default function DashboardHeader({
  className,
}: React.ComponentProps<'div'>) {
  const submissions = useDashboardStore((state) => state.submissions);
  const dateRange = useDashboardStore((state) => state.dateRange);

  const { percentage, message, closeToExpiry } = useMemo(() => {
    const total = differenceInDays(dateRange.to, dateRange.from);
    const usage = differenceInDays(new Date(), dateRange.from);
    const percentage = (usage / total) * 100;

    const { months, days } = intervalToDuration({
      start: new Date(),
      end: dateRange.to,
    });

    const monthSection = months
      ? `${months} ${months > 1 ? 'months' : 'month'}`
      : null;
    const daySection = days ? `${days} ${days > 1 ? 'days' : 'day'}` : null;

    return {
      percentage,
      closeToExpiry: (months ?? 0) < 3,
      message: `Expiring in ${monthSection ?? ''} ${monthSection ? 'and' : ''} ${daySection ?? ''}`,
    };
  }, [dateRange]);

  return (
    <div className={cn('', className)}>
      <p className="text-sm text-muted-foreground">Total tickets</p>
      <p className="text-2xl font-bold">{submissions.length} tickets</p>
      <p className="text-xs mt-1">
        Services Subscription Validity
        {` (${format(dateRange.from, DATE_FORMAT)} - ${format(dateRange.to, DATE_FORMAT)})`}
      </p>
      <Progress
        className={cn(
          {
            '[&>*]:bg-red-600': closeToExpiry,
          },
          'mt-1 w-4/5',
        )}
        value={percentage}
      />
      <span className="text-xs text-muted-foreground">{message}</span>
    </div>
  );
}
