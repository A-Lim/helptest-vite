import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { DateRangePicker } from './ui/date-range-picker';

export default function Header({ className }: { className: string }) {
	return (
		<div
			className={cn(
				'flex flex-col sm:flex-row justify-between gap-2 mb-8 ',
				className,
			)}
		>
			<h1 className="text-3xl font-bold tracking-tight;">Dashboard</h1>
			<div className="flex flex-col sm:flex-row gap-2">
				<DateRangePicker className="w-full sm:w-auto" />
				<Button>
					<Plus /> New Ticket
				</Button>
			</div>
		</div>
	);
}
