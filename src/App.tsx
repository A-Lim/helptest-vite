import { useEffect } from 'react';
import './App.css';
import { DataTableDemo } from './components/datatable';
import Header from './components/header';
import Subscription from './components/subscription';
import TicketStats from './components/ticket-stats';
import { ScrollArea } from './components/ui/scroll-area';
import { InterativeBar } from './interactive-bar';

function App() {
	console.log(window);
	useEffect(() => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		// const onMessageReceive = (event: any) => {
		// 	console.log('EVENT', event);
		// 	console.log('EVENT DATA', event.data);
		// };
		// window.addEventListener('message', onMessageReceive);

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		console.log('ADD LISTENER');
		window.addEventListener('storage', (event: any) => {
			console.log('CHANGE');
			console.log('SESSION ', event);
		});

		// return () => window.removeEventListener('message', onMessageReceive);
	});

	return (
		<div className="h-screen bg-gray-50">
			<ScrollArea className="h-full w-full p-4">
				<button
					type="button"
					onClick={() => localStorage.setItem('test', Date.now().toString())}
				>
					Test
				</button>
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
