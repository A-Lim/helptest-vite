import { getMatrix } from '@/service/api.service';
import { useQuery } from '@tanstack/react-query';

import { KubeMatrixRequest } from '@/types/kube/kube-matrix-request.type';

// get maxtrix row based on user's company user profile field
export function useUserMatrix(company: string) {
  const code = import.meta.env.VITE_MATRIX_CODE;
  const params = <KubeMatrixRequest>{
    isExactSearchText: true,
    filterColumns: [
      {
        column: 'CompanyName',
        type: 'text',
        searchText: company,
      },
    ],
  };

  const data = useQuery({
    queryKey: ['matrix', { code, params }],
    queryFn: () =>
      getMatrix<{
        CompanyName: string;
        FormDesignID: number;
      }>(code, params),
    enabled: !!company,
  });

  if (data.data?.data.length === 0) {
    throw new Error("Unable to locate user's company in matrix.");
  }

  return {
    ...data,
    data: data.data?.data[0],
  };
}
