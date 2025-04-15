import { endOfMonth, format, startOfMonth } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import type { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { DATE_FORMAT } from '@/constants';
import { cn } from '@/lib/utils';

export function DateRangePicker({
	className,
}: React.HTMLAttributes<HTMLDivElement>) {
	const today = new Date();
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: startOfMonth(today),
		to: endOfMonth(today),
	});

	return (
		<div className={cn('grid gap-2')}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={'outline'}
						className={cn(
							'min-w-[230px] justify-start text-left font-normal',
							!date && 'text-muted-foreground',
							className,
						)}
					>
						<CalendarIcon />
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
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
