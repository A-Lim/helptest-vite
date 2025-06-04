import { ComponentProps, useMemo } from 'react';
import { useDashboardStore } from '@/providers/dashboard.provider';

import { KubeSubmission } from '@/types/kube/kube-submission.type';
import { cn } from '@/lib/utils';

import ChartSummary, { ChartSummaryData } from './chart-summary';

const COLORS = {
  'man-days': {
    subscribed: '#fb2c36',
    rollover: '#2b7fff',
    utilized: '#efb100',
  },
  'man-hours': {
    subscribed: '#fb2c36',
    rollover: '#2b7fff',
    utilized: '#efb100',
  },
};

const getValueByUnit = (type: 'man-days' | 'man-hours', value: string) => {
  const val = +value;
  return type === 'man-days' ? val : val * 8;
};

export function BalanceSummary({
  className,
  submissions,
  type,
}: ComponentProps<'div'> & {
  submissions: KubeSubmission[];
  type: 'man-days' | 'man-hours';
}) {
  const matrix = useDashboardStore((state) => state.matrix);
  const tooltipTitle =
    type === 'man-days' ? 'No of man days' : 'No of man hours';
  const unit = type === 'man-days' ? 'Days' : 'Hours';

  const { balance, utilized } = useMemo(() => {
    const total =
      type === 'man-days'
        ? +matrix.SubscribedManDays
        : +matrix.SubscribedManDays * 8;
    let utilized = 0;

    submissions.forEach((submission) => {
      if (submission.ddlChargingCategory === 'Chargeable')
        utilized +=
          type === 'man-days'
            ? +submission.numSupportManDays
            : +submission.numSupportManHours;
    });

    return {
      balance: total + getValueByUnit(type, matrix.RolloverManDays) - utilized,
      utilized,
    };
  }, [submissions, matrix]);

  const chartData: ChartSummaryData[] = [
    {
      label: 'Subscribed',
      tooltip: 'Subscribed',
      fill: COLORS[type]['subscribed'],
      count: getValueByUnit(type, matrix.SubscribedManDays),
    },
    {
      label: 'Rollover',
      tooltip: 'Rollover',
      fill: COLORS[type]['rollover'],
      count: getValueByUnit(type, matrix.RolloverManDays),
    },
    {
      label: 'Utilized',
      tooltip: 'Utilized',
      fill: COLORS[type]['utilized'],
      count: utilized,
    },
  ];

  return (
    <div className={cn(className, 'grid grid-cols-7 divide-x')}>
      <div className="col-span-2 text-center p-2">
        <p className="text-muted-foreground text-xs">
          Balance {type === 'man-days' ? 'Man Days' : 'Man Hours'}
        </p>
        <p className="text-3xl font-bold mt-4">{balance}</p>
      </div>
      <div className="text-center p-2">
        <p className="text-muted-foreground text-xs">Subscribed</p>
        <p
          className="text-2xl font-bold mt-4"
          style={{ color: COLORS[type]['subscribed'] }}
        >
          {getValueByUnit(type, matrix.SubscribedManDays)}
        </p>
      </div>
      <div className="text-center p-2">
        <p className="text-muted-foreground text-xs">Rollover</p>
        <p
          className="text-2xl font-bold mt-4"
          style={{ color: COLORS[type]['rollover'] }}
        >
          {getValueByUnit(type, matrix.RolloverManDays)}
        </p>
      </div>
      <div className="text-center p-2">
        <p className="text-muted-foreground text-xs">Utilized</p>
        <p
          className="text-2xl font-bold mt-4"
          style={{ color: COLORS[type]['utilized'] }}
        >
          {utilized}
        </p>
      </div>
      <div className="p-2 col-span-2 flex justify-center items-center">
        <ChartSummary
          unit={unit}
          data={chartData}
          tooltipTitle={tooltipTitle}
        />
      </div>
    </div>
  );
}
