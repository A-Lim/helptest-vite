import { getMatrix } from '@/service/api.service';
import { useQuery } from '@tanstack/react-query';

import { KubeMatrixRequest } from '@/types/kube/kube-matrix-request.type';
import {
  KubeMatrixSupport,
  KubeMatrixSupportFields,
} from '@/types/kube/kube-matrix-support.type';

export const useGetSupportMatrix = () => {
  const code = import.meta.env.VITE_SUPPORT_SERVICES_MATRIX_CODE;
  const params: KubeMatrixRequest = {
    isExactSearchText: false,
    filterColumns: [
      {
        column: 'TicketType',
        type: 'text',
        searchText: '',
      },
    ],
  };

  return useQuery({
    queryKey: ['support-matrix'],
    queryFn: async () => {
      const data = await getMatrix<KubeMatrixSupportFields>(code, params);

      if (!data) throw new Error('No matrix record found.');
      return data;
    },
    select: (response) => response.data as KubeMatrixSupport[],
  });
};
