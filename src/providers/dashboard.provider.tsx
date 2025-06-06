import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { DATETIME_FORMAT } from '@/constants';
import { parse } from 'date-fns';
import { createStore, StoreApi, useStore } from 'zustand';

import { KubeMatrixCompany } from '@/types/kube/kube-matrix-company.type';
import { KubeMatrixSupport } from '@/types/kube/kube-matrix-support.type';
import { KubeSubmission } from '@/types/kube/kube-submission.type';
import { LabelValue } from '@/types/label-value.type';

export type DashboardStoreState = {
  dateRange: {
    from: Date;
    to: Date;
  };
  supportMatrixes: KubeMatrixSupport[];
  statuses: LabelValue[];
  companyMatrix: KubeMatrixCompany;
  submissions: KubeSubmission[];
};

const DashboardContext = createContext<
  StoreApi<DashboardStoreState> | undefined
>(undefined);

export default function DashboardProvider({
  companyMatrix,
  supportMatrixes,
  statuses,
  submissions,
  children,
}: PropsWithChildren & {
  statuses: LabelValue[];
  submissions: KubeSubmission[];
  companyMatrix: KubeMatrixCompany;
  supportMatrixes: KubeMatrixSupport[];
}) {
  const today = new Date();
  const [store] = useState(() =>
    createStore<DashboardStoreState>(() => ({
      dateRange: {
        from: parse(companyMatrix.ContractStartDate, DATETIME_FORMAT, today),
        to: parse(companyMatrix.ContractEndDate, DATETIME_FORMAT, today),
      },
      statuses,
      companyMatrix,
      supportMatrixes,
      submissions,
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
