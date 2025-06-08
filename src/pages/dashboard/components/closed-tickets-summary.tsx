import { ComponentProps, useMemo } from 'react';

import { KubeSubmission } from '@/types/kube/kube-submission.type';
import { cn } from '@/lib/utils';

import ChartSummary, { ChartSummaryData } from './chart-summary';

const COLORS = {
  chargeable: '#a684ff',
  grouped: '#5ea500',
  nonchargeable: '#52525c',
};

export function ClosedTicketSummary({
  className,
  submissions,
}: ComponentProps<'div'> & {
  submissions: KubeSubmission[];
}) {
  const { chargeable, grouped, nonchargeable } = useMemo(() => {
    let chargeable = 0,
      grouped = 0,
      nonchargeable = 0;

    submissions.forEach((submission) => {
      switch (submission.ddlChargingCategory) {
        case 'Chargeable':
          chargeable += 1;
          return;

        case 'Non-Chargeable':
          nonchargeable += 1;
          return;

        case 'Grouped':
          grouped += 1;
          return;
      }
    });

    return { grouped, chargeable, nonchargeable };
  }, [submissions]);

  const chartData: ChartSummaryData[] = [
    {
      label: 'Chargeable',
      tooltip: 'Chargeable',
      fill: COLORS['chargeable'],
      count: chargeable,
    },
    {
      label: 'Grouped',
      tooltip: 'Grouped',
      fill: COLORS['grouped'],
      count: grouped,
    },
    {
      label: 'Non-Chargeable',
      tooltip: 'Non-Chargeable',
      fill: COLORS['nonchargeable'],
      count: nonchargeable,
    },
  ];

  return (
    <div className={cn(className, 'grid grid-cols-12 divide-x')}>
      <div className="col-span-3 text-center p-2">
        <p className="text-muted-foreground text-xs">Closed Tickets</p>
        <p className="text-3xl font-bold mt-4">{submissions.length}</p>
      </div>
      <div className="text-center p-2 col-span-2">
        <p className="text-muted-foreground text-xs">Chargeable</p>
        <p
          className="text-2xl font-bold mt-4"
          style={{ color: COLORS['chargeable'] }}
        >
          {chargeable}
        </p>
      </div>
      <div className="text-center p-2 col-span-2">
        <p className="text-muted-foreground text-xs">Grouped</p>
        <p
          className="text-2xl font-bold mt-4"
          style={{ color: COLORS['grouped'] }}
        >
          {grouped}
        </p>
      </div>
      <div className="text-center p-2 col-span-2">
        <p className="text-muted-foreground text-xs leading-tight">
          Non-Chargeable
        </p>
        <p
          className="text-2xl font-bold mt-4"
          style={{ color: COLORS['nonchargeable'] }}
        >
          {nonchargeable}
        </p>
      </div>
      <div className="p-2 col-span-3 flex items-center justify-center">
        <ChartSummary
          unit="tickets"
          data={chartData}
          tooltipTitle="No of tickets"
        />
      </div>
    </div>
  );
}
