import { ComponentProps } from 'react';
import { Frown, Meh, Smile } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

export function CustomerSurvey({ className }: ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col', className)}>
      <h3 className="tracking-tight text-sm font-medium">
        Customer Satisfaction
      </h3>
      <p className="text-sm text-muted-foreground">Across helpdesk this year</p>
      <div className="grid grid-cols-2 flex-1">
        <div className="flex flex-col justify-center gap-1">
          <h2 className="tracking-tight text-sm text-muted-foreground">
            Responses Received
          </h2>
          <p className="text-3xl font-bold">312</p>
          {/* empty div so that the contents are aligned with other grids */}
          <div className="mt-1 h-1.5"></div>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <h2 className="tracking-tight text-sm text-muted-foreground">
            Positive
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-3xl font-bold">91%</p>
            <Smile className="bg-green-100 text-green-600 rounded-full" />
          </div>
          <Progress
            className={cn('', 'mt-1 h-1.5 w-4/5 [&>*]:bg-green-600')}
            value={91}
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <h2 className="tracking-tight text-sm text-muted-foreground">
            Neutral
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-3xl font-bold">6%</p>
            <Meh className="bg-yellow-100 text-yellow-600 rounded-full" />
          </div>
          <Progress
            className={cn('', 'mt-1 h-1.5 w-4/5 [&>*]:bg-yellow-600')}
            value={6}
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <h2 className="tracking-tight text-sm text-muted-foreground">
            Negative
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-3xl font-bold">3%</p>
            <Frown className="bg-red-100 text-red-600 rounded-full" />
          </div>
          <Progress
            className={cn('', 'mt-1 h-1.5 w-4/5 [&>*]:bg-red-600')}
            value={3}
          />
        </div>
      </div>
    </div>
  );
}
