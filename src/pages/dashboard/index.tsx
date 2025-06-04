import ChartSupportUlitsation from './components/chart-support-utlisation';
import ChartTicketSeverity from './components/chart-ticket-serverity';
import DashboardHeader from './components/dashboard-header';
import { Summaries } from './components/summaries';
import { TicketsOverview } from './components/tickets-overview';
import { DashboardLayout } from './layout';

export function Dashboard() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-24 gap-4">
        <DashboardHeader className="col-span-8" />
        <TicketsOverview className="col-span-16" />
        <ChartSupportUlitsation className="col-span-7" />
        <ChartTicketSeverity className="col-span-7" />
        <Summaries className="col-span-10" />
      </div>
    </DashboardLayout>
  );
}
