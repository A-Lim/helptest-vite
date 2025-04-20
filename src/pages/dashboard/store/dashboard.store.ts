import { endOfMonth, setMilliseconds, startOfMonth } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { create } from 'zustand';

import { KubeMatrixDashboardFields } from '@/types/kube/kube-matrix-dashboard-fields.type';
import { KubeMatrix } from '@/types/kube/kube-matrix.type';

type KubeMatrixDashboard = KubeMatrix<KubeMatrixDashboardFields>;

type DashboardStoreState = {
  dateRange?: DateRange;
  formDesignId?: number;
  setDateRange: (dateRange?: DateRange) => void;
  setMatrix: (matrix: KubeMatrixDashboard) => void;
};

const today = new Date();
export const useDashboardStore = create<DashboardStoreState>((set, get) => ({
  dateRange: {
    from: startOfMonth(today),
    to: setMilliseconds(endOfMonth(today), 0),
  },
  formDesignId: undefined,
  setDateRange: (dateRange?: DateRange) => set(() => ({ dateRange })),
  setMatrix: (matrix: KubeMatrixDashboard) => {
    return set(() => ({ formDesignId: parseInt(matrix.FormDesignID) }));
  },
}));
