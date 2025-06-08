import { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import { TableDataSubmission } from './table-data-submission';
import { TableHeaderSubmission } from './table-header-submission';

export function TableSubmissions({ className }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'w-full h-full bg-card text-card-foreground flex flex-col gap-2 border rounded-md p-4',
        className,
      )}
    >
      <TableHeaderSubmission />
      <TableDataSubmission />
    </div>
  );
}
