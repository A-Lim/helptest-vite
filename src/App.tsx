import './App.css';

import { Dashboard } from '@/pages/dashboard';
import DashboardProvider from '@/providers/dashboard.provider';

import { useAuth } from '@/hooks/auth.hook';
import { useGetSubmissions } from '@/hooks/get-submissions.hook';
import { useGetUserMatrix } from '@/hooks/get-user-matrix.hook';

function App() {
  const { company } = useAuth();
  const { data: matrix } = useGetUserMatrix(company);
  const { data: submissions } = useGetSubmissions(matrix);

  const ready = !!matrix && !!submissions;

  return (
    <div className="h-screen">
      {ready && (
        <DashboardProvider matrix={matrix} submissions={submissions}>
          <Dashboard />
        </DashboardProvider>
      )}
    </div>
  );
}

export default App;
