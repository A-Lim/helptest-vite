import './App.css';

import { Dashboard } from '@/pages/dashboard';
import DashboardProvider from '@/providers/dashboard.provider';

import { useAuth } from '@/hooks/auth.hook';
import { useGetCompanyMatrix } from '@/hooks/get-company-matrix.hook';
import { useGetSubmissions } from '@/hooks/get-submissions.hook';

import { useGetStatusMasterList } from './hooks/get-status-masterlist.hook';
import { useGetSupportMatrix } from './hooks/get-support-matrix.hook';
import { LabelValue } from './types/label-value.type';

function App() {
  const { company } = useAuth();
  const { data: companyMatrix } = useGetCompanyMatrix(company);
  const { data: submissions } = useGetSubmissions(companyMatrix);
  const { data: supportMatrixes } = useGetSupportMatrix();
  const { data: statusMasterlistItems } = useGetStatusMasterList();

  const ready =
    !!companyMatrix &&
    !!supportMatrixes &&
    !!statusMasterlistItems &&
    !!submissions;

  if (!ready) return <div>Loading</div>;

  const statuses = statusMasterlistItems.reduce((arr, item) => {
    if (item.isActive && !item.isDeleted)
      arr.push({ label: item.title, value: item.title });
    return arr;
  }, [] as LabelValue[]);

  return (
    <div className="h-screen">
      <DashboardProvider
        companyMatrix={companyMatrix}
        supportMatrixes={supportMatrixes}
        submissions={submissions}
        statuses={statuses}
      >
        <Dashboard />
      </DashboardProvider>
    </div>
  );
}

export default App;
