import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { DATETIME_FORMAT } from '@/constants';
import { parse } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { createStore, StoreApi, useStore } from 'zustand';

import { KubeMatrixDashboard } from '@/types/kube/kube-matrix-dashboard.type';
import { KubeSubmission } from '@/types/kube/kube-submission.type';

export type DashboardStoreState = {
  dateRange?: DateRange;
  matrix?: KubeMatrixDashboard;
  submissions?: KubeSubmission[];
  setDateRange: (dateRange?: DateRange) => void;
  setMatrix: (matrix: KubeMatrixDashboard) => void;
};

const DashboardContext = createContext<
  StoreApi<DashboardStoreState> | undefined
>(undefined);

export default function DashboardProvider({
  matrix,
  submissions,
  children,
}: PropsWithChildren & {
  submissions: KubeSubmission[];
  matrix: KubeMatrixDashboard;
}) {
  const today = new Date();
  const [store] = useState(() =>
    createStore<DashboardStoreState>((set) => ({
      dateRange: {
        from: parse(matrix.ContractStartDate, DATETIME_FORMAT, today),
        to: parse(matrix.ContractEndDate, DATETIME_FORMAT, today),
      },
      submissions,
      setDateRange: (dateRange?: DateRange) => set(() => ({ dateRange })),
      setMatrix: (matrix: KubeMatrixDashboard) =>
        set(() => ({
          matrix,
          dateRange: {
            from: parse(matrix.ContractStartDate, DATETIME_FORMAT, today),
            to: parse(matrix.ContractEndDate, DATETIME_FORMAT, today),
          },
        })),
    })),
  );

  return (
    <DashboardContext.Provider value={store}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardStore<T>(
  selector: (state: DashboardStoreState) => T,
) {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error('DashboardContext.Provider is missing');
  }

  return useStore(context, selector);
}
