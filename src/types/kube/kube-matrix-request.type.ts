export type KubeMatrixRequest = {
  isExactSearchText?: boolean;
  isAllowWildCard?: boolean;
  isBestMatch?: boolean;
  filterColumns: (
    | KubeMatrixFilterTextColumn
    | KubeMatrixFilterPeopleColumn
    | KubeMatrixFilterConditionColumn
    | KubeMatrixFilterMasterListColumn
  )[];
};

export type KubeMatrixBaseFilterColumn = {
  column: string;
};

export type KubeMatrixFilterTextColumn = {
  type: 'text';
  searchText: string;
} & KubeMatrixBaseFilterColumn;

export type KubeMatrixFilterPeopleColumn = {
  type: 'people';
  options: string[];
} & KubeMatrixBaseFilterColumn;

export type KubeMatrixFilterConditionColumn = {
  type: 'condition';
  searchText: string[];
} & KubeMatrixBaseFilterColumn;

export type KubeMatrixFilterMasterListColumn = {
  type: 'masterlist';
  searchText: string[];
} & KubeMatrixBaseFilterColumn;
