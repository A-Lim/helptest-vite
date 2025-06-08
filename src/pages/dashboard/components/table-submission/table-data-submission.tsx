import { ColumnDef } from '@tanstack/react-table';

import { KubeSubmission } from '@/types/kube/kube-submission.type';
import { DataTable } from '@/components/data-table';

import { useFilteredSubmissions } from './submission-filter.store';
import { TableRowSubmission } from './table-row-submission';

export const columns: ColumnDef<KubeSubmission>[] = [
  {
    accessorKey: 'sys_SubmissionId',
    cell: ({ row }) => {
      return <TableRowSubmission submission={row.original} />;
    },
  },
];

export function TableDataSubmission() {
  const submissions = useFilteredSubmissions();
  return <DataTable showHeader={false} columns={columns} data={submissions} />;
}
