import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CircleCheckBig, FolderOpen, Loader, Sparkle } from 'lucide-react';

export default function TicketStats({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				'grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-4',
				className,
			)}
		>
			<Card className="py-4 md:py-6">
				<CardHeader className="relative px-4 md:px-6">
					<CardDescription>New Tickets</CardDescription>
					<CardTitle className="flex space-x-2 items-center">
						<Sparkle size="20" className="text-yellow-700" />
						<span className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
							100
						</span>
					</CardTitle>
				</CardHeader>
			</Card>
			<Card className="py-4 md:py-6">
				<CardHeader className="relative px-4 md:px-6">
					<CardDescription>Open Tickets</CardDescription>
					<CardTitle className="flex space-x-2 items-center">
						<FolderOpen size="20" className="text-blue-700" />
						<span className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
							100
						</span>
					</CardTitle>
				</CardHeader>
			</Card>
			<Card className="py-4 md:py-6">
				<CardHeader className="relative px-4 md:px-6">
					<CardDescription>Pending Tickets</CardDescription>
					<CardTitle className="flex space-x-2 items-center">
						<Loader size="20" className="text-red-700" />
						<span className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
							100
						</span>
					</CardTitle>
				</CardHeader>
			</Card>
			<Card className="py-4 md:py-6">
				<CardHeader className="relative px-4 md:px-6">
					<CardDescription>Closed Tickets</CardDescription>
					<CardTitle className="flex space-x-2 items-center">
						<CircleCheckBig size="20" className="text-green-700" />
						<span className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
							100
						</span>
					</CardTitle>
				</CardHeader>
			</Card>
		</div>
	);
}
