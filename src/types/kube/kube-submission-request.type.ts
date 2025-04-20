import { DateRange } from 'react-day-picker';

import { KubeSort } from './kube-sort.type';

export type KubeSubmissionRequest = {
  page?: number;
  pageSize?: number;
  sort?: KubeSort[];
  displayFields: string[];
  filterFields?: KubeSubmissionFilter[];
};

type KubeSubmissionFilter = {
  fieldTypeId?: number;
  fieldCode: string;
  searchValue?: string[];
  dateRange?: DateRange;
  options?: string;
  operator?: string;
  dateTimeFormat?: string; // do not use (always use isodate format)
};
