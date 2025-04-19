import './App.css';

import { Dashboard } from './components/dashbboard/dashboard';
import { ScrollArea } from './components/ui/scroll-area';
import { useUserContext } from './contexts/auth.context';
import { useUserMatrix } from './hooks/user-matrix.hook';

function App() {
  const { token, user, company } = useUserContext();
  const { data } = useUserMatrix(company);

  return (
    <div className="h-screen bg-gray-50">
      <ScrollArea className="h-full w-full p-4">
        <div className="space-y-4">
          <div>Token: {token}</div>
          <div>User: {JSON.stringify(user)}</div>
          <div>Company: {company}</div>
          <div>Matrix Column: {JSON.stringify(data)}</div>
        </div>
        <Dashboard />
      </ScrollArea>
    </div>
  );
}

export default App;
