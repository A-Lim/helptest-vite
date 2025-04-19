export type KubePaginatedRequest = {
  Page?: number;
  PageSize?: number;
  Sort?: KubeSort[];
  DisplayFields: string[];
  FilterFields?: KubeFilterField[];
};

type KubeSort = {
  Column: string;
  Direction: 'desc' | 'asc';
};

type KubeFilterField = {
  FieldCode: string;
  SearchValue?: string;
  DateRange?: KubeDateRange;
  Options?: string;
};

type KubeDateRange = {
  From?: string;
  To?: string;
};
