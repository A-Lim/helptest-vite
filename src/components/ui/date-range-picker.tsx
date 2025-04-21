'use client';

import * as React from 'react';
import { DATE_FORMAT } from '@/constants';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { type DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function DateRangePicker({
  className,
  onChange,
  value,
}: Omit<React.ComponentPropsWithoutRef<'input'>, 'value' | 'onChange'> & {
  value?: DateRange;
  onChange?: (dateRange?: DateRange) => void;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>(value);
  const handleDateChange = (dateRange?: DateRange) => {
    setDate(dateRange);
    onChange?.(dateRange);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-64 justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, DATE_FORMAT)} -{' '}
                  {format(date.to, DATE_FORMAT)}
                </>
              ) : (
                format(date.from, DATE_FORMAT)
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from ?? new Date()}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
