import { getMasterlist } from '@/service/api.service';
import { useQuery } from '@tanstack/react-query';

import { KubeMasterListItem } from '@/types/kube/kube-masterlist.type';

export const useGetStatusMasterList = () => {
  const code = import.meta.env.VITE_STATUS_MASTERLIST_CODE;

  return useQuery({
    queryKey: ['status-masterlist'],
    queryFn: async () => {
      const data = await getMasterlist<KubeMasterListItem>(code);

      if (!data) throw new Error('No masterlist record found.');
      return data;
    },
    select: (response) => response,
  });
};
