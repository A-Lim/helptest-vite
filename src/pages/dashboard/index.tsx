import { useAuthContext } from '@/contexts/auth.context';
import { getMatrix } from '@/service/api.service';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { KubeMatrixDashboardFields } from '@/types/kube/kube-matrix-dashboard-fields.type';
import { KubeMatrixRequest } from '@/types/kube/kube-matrix-request.type';
import { DateRangePicker } from '@/components/ui/date-range-picker';

import { DashboardLayout } from './layout';
import { useDashboardStore } from './store/dashboard.store';
import Submissions from './submissions';

export function Dashboard() {
  const { token, user, company } = useAuthContext();
  const { setMatrix, setDateRange } = useDashboardStore();
  const formDesignId = useDashboardStore((state) => state.formDesignId);
  const dateRange = useDashboardStore((state) => state.dateRange);

  useQuery({
    queryKey: ['user-matrix', company],
    queryFn: async () => {
      const code = import.meta.env.VITE_MATRIX_CODE;
      const params: KubeMatrixRequest = {
        isExactSearchText: true,
        filterColumns: [
          {
            column: 'CompanyName',
            type: 'text',
            searchText: company,
          },
        ],
      };
      const data = await getMatrix<KubeMatrixDashboardFields>(code, params);

      if (!data) toast.error('No matrix record found.');

      if (data.data.length === 0)
        toast.error("Unable to locate user's company in matrix.");

      setMatrix(data.data[0]);
      return data;
    },
  });

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div>Token: {token}</div>
        <div>User: {JSON.stringify(user)}</div>
        <div>Company: {company}</div>
        <div>FormDesign ID: {formDesignId}</div>
        <div>
          DateRange: {dateRange?.from?.toISOString()}-
          {dateRange?.to?.toISOString()}
        </div>
        <DateRangePicker
          value={dateRange}
          onChange={(range) => setDateRange(range)}
        />
        {formDesignId && dateRange?.from && dateRange.to ? (
          <Submissions formDesignID={formDesignId} dateRange={dateRange} />
        ) : (
          <></>
        )}
      </div>
    </DashboardLayout>
  );
}
