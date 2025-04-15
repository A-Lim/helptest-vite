import './App.css';
import { DataTableDemo } from './components/datatable';
import Header from './components/header';
import Subscription from './components/subscription';
import TicketStats from './components/ticket-stats';
import { ScrollArea } from './components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { InterativeBar } from './interactive-bar';

function App() {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	console.log(window);
	return (
		<div className="h-screen bg-gray-50">
			<ScrollArea className="h-full w-full p-4">
				<div className="grid grid-cols-6 gap-4">
					<Header className="col-span-6" />
					<div className="col-span-2 space-y-1 md:space-y-1.5">
						<p className="text-sm text-muted-foreground leading-none">
							This month's ticket
						</p>
						<h1 className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
							280 Tickets
						</h1>
					</div>
					<TicketStats className="col-span-4" />

					<Subscription className="col-span-3" />
					<DataTableDemo className="row-span-2 col-span-3" />
					<InterativeBar className="col-span-3" />
				</div>
			</ScrollArea>
		</div>
	);
}

export default App;
