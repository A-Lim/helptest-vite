import { useMemo } from 'react';
import { getSubmissionList } from '@/service/api.service';
import { useQuery } from '@tanstack/react-query';
import { DateRange } from 'react-day-picker';

import { KubeSubmissionRequest } from '@/types/kube/kube-submission-request.type';

import { useSubmissionStore } from './store/submission.store';

export default function Submissions({
  formDesignID,
  dateRange,
}: {
  formDesignID: number;
  dateRange: DateRange;
}) {
  const { setSubmissions } = useSubmissionStore();

  const { data } = useQuery({
    queryKey: ['submissions', formDesignID, dateRange],
    queryFn: async () => {
      const params: KubeSubmissionRequest = {
        displayFields: ['sys_Status'],
        filterFields: [
          {
            fieldCode: 'sys_SubmittedDate',
            dateRange,
          },
        ],
      };
      const data = await getSubmissionList(formDesignID, params);
      setSubmissions(data.data);
      return data;
    },
  });

  const stats = useMemo(() => {
    const record: Record<string, number> = {};
    console.log(data);
    data?.data.reduce((acc, submission) => {
      if (!acc.hasOwnProperty(submission.sys_Status)) {
        acc[submission.sys_Status] = 0;
      }

      acc[submission.sys_Status] += 1;
      return acc;
    }, record);
    return record;
  }, [data]);

  return (
    <div>
      Submission Records: <pre>{JSON.stringify(data)}</pre>
      <div>
        Stats:
        <pre>{JSON.stringify(stats)}</pre>
      </div>
    </div>
  );
}
