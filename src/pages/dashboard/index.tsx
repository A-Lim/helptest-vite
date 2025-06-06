import ChartTicketSeverity from './components/chart-ticket-serverity';
import ChartTicketUtilisation from './components/chart-ticket-utilisation';
import DashboardHeader from './components/dashboard-header';
import { Summaries } from './components/summaries';
import { TableSubmissions } from './components/table-submission/table-submissions';
import { TicketsOverview } from './components/tickets-overview';
import { DashboardLayout } from './layout';

export function Dashboard() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-24 gap-4">
        <DashboardHeader className="col-span-8" />
        <TicketsOverview className="col-span-16" />
        <ChartTicketUtilisation className="col-span-7" />
        <ChartTicketSeverity className="col-span-7" />
        <Summaries className="col-span-10" />
        <TableSubmissions className="col-span-24" />
      </div>
    </DashboardLayout>
  );
}
