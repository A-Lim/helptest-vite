import { DATETIME_FORMAT } from '@/constants';
import { getSubmissionList } from '@/service/api.service';
import { useQuery } from '@tanstack/react-query';
import { parse } from 'date-fns';

import { KubeMatrixDashboard } from '@/types/kube/kube-matrix-dashboard.type';
import { KubeSubmissionRequest } from '@/types/kube/kube-submission-request.type';

export const useGetSubmissions = (matrix?: KubeMatrixDashboard) => {
  const formDesignId = matrix?.FormDesignID;
  const dateRange = matrix
    ? {
        from: parse(matrix.ContractStartDate, DATETIME_FORMAT, new Date()),
        to: parse(matrix.ContractEndDate, DATETIME_FORMAT, new Date()),
      }
    : undefined;

  const params: KubeSubmissionRequest = {
    displayFields: [
      'sys_Status',
      'sysReportedDate',
      'rdbSeverityLevel',
      'numSupportManHours',
      'numSupportManDays',
    ],
    filterFields: [
      {
        fieldCode: 'sys_SubmittedDate',
        dateRange,
      },
    ],
  };

  return useQuery({
    queryKey: ['submissions', formDesignId, dateRange],
    queryFn: () => getSubmissionList(formDesignId!, params),
    select: (response) => response.data,
    enabled: !!matrix,
  });
};
