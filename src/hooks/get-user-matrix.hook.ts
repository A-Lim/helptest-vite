import { getMatrix } from '@/service/api.service';
import { useQuery } from '@tanstack/react-query';

import { KubeMatrixDashboardFields } from '@/types/kube/kube-matrix-dashboard.type';
import { KubeMatrixRequest } from '@/types/kube/kube-matrix-request.type';

export const useGetUserMatrix = (company: string) => {
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

  return useQuery({
    queryKey: ['user-matrix', company],
    queryFn: async () => {
      const data = await getMatrix<KubeMatrixDashboardFields>(code, params);

      if (!data) throw new Error('No matrix record found.');

      if (data.data.length === 0)
        throw new Error("Unable to locate user's company in matrix.");

      return data;
    },
    select: (response) => response.data[0],
  });
};
