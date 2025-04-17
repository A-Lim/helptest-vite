import { cn } from '@/lib/utils';
import { SubscriptionChart } from './subscription-chart';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

export default function Subscription({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				'grid grid-cols-4 bg-card text-card-foreground rounded-xl border shadow-sm',
				className,
			)}
		>
			<div className="col-span-3">
				<div className="p-4 md:p-6 border-b">
					<div className="flex justify-between">
						<div>
							<h2 className="font-medium text-xl">
								Support & Maintenance Services
							</h2>
							<span className="text-sm text-muted-foreground">
								Valid: 1 Jan 2025 - 31 Dec 2025
							</span>
						</div>

						<Badge variant="outline">3 Months Left</Badge>
					</div>

					<Progress className="mt-2" value={33} />
				</div>
				<div className="grid grid-cols-4 p-4 md:p-6">
					<div className="flex flex-col gap-2">
						<p className="text-sm">Remaining</p>
						<div className="flex gap-1 items-baseline">
							<span className="text-2xl font-semibold">11</span>
							<span>hrs</span>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<p className="text-sm">Subscribed</p>
						<div className="flex gap-1 items-baseline">
							<span className="text-2xl font-semibold">11</span>
							<span>hrs</span>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<p className="text-sm">Carried Forward</p>
						<div className="flex gap-1 items-baseline">
							<span className="text-2xl font-semibold">11</span>
							<span>hrs</span>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<p className="text-sm">Used</p>
						<div className="flex gap-1 items-baseline">
							<span className="text-2xl font-semibold">11</span>
							<span>hrs</span>
						</div>
					</div>
				</div>
			</div>
			<div className="border-l flex justify-center items-center">
				<SubscriptionChart />
			</div>
		</div>
	);
}
