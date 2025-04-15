'use client';

import { LabelList, Pie, PieChart } from 'recharts';

import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
const chartData = [
	{ browser: 'chrome', visitors: 275, fill: 'var(--chart-1)' },
	{ browser: 'safari', visitors: 200, fill: 'var(--chart-2)' },
	{ browser: 'firefox', visitors: 187, fill: 'var(--chart-3)' },
	{ browser: 'edge', visitors: 173, fill: 'var(--chart-4)' },
	{ browser: 'other', visitors: 90, fill: 'var(--chart-5)' },
];

const chartConfig = {
	visitors: {
		label: 'Visitors',
	},
	chrome: {
		label: 'Chrome',
		color: 'hsl(var(--chart-1))',
	},
	safari: {
		label: 'Safari',
		color: 'hsl(var(--chart-2))',
	},
	firefox: {
		label: 'Firefox',
		color: 'hsl(var(--chart-3))',
	},
	edge: {
		label: 'Edge',
		color: 'hsl(var(--chart-4))',
	},
	other: {
		label: 'Other',
		color: 'hsl(var(--chart-5))',
	},
} satisfies ChartConfig;

export function SubscriptionChart() {
	return (
		<ChartContainer
			config={chartConfig}
			className="mx-auto aspect-square min-h-[200px] [&_.recharts-text]:fill-background"
		>
			<PieChart>
				<ChartTooltip
					content={<ChartTooltipContent nameKey="visitors" hideLabel />}
				/>
				<Pie data={chartData} dataKey="visitors">
					<LabelList
						dataKey="browser"
						className="fill-background"
						stroke="none"
						fontSize={12}
						formatter={(value: keyof typeof chartConfig) =>
							chartConfig[value]?.label
						}
					/>
				</Pie>
			</PieChart>
		</ChartContainer>
	);
}
