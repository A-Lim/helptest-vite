import { ComponentProps } from 'react';
import { useDashboardStore } from '@/providers/dashboard.provider';
import useDebounce from 'react-debounced';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import SearchInput from '@/components/search';

import {
  useFilteredSubmissions,
  useSubmissionFilterStore,
} from './submission-filter.store';
import { TableDataSubmission } from './table-data-submission';
import { TableFilterSubmission } from './table-filter-submission';

export function TableSubmissions({ className }: ComponentProps<'div'>) {
  const debounce = useDebounce(300);
  const companyMatrix = useDashboardStore((state) => state.companyMatrix);
  const setSearch = useSubmissionFilterStore((state) => state.setSearch);
  const addTicketUrl = `${import.meta.env.VITE_PARENT_URL}/submission/${companyMatrix.FormDesignID}`;
  const filteredSubmissions = useFilteredSubmissions();

  const redirectToNewSubmission = () => {
    if (import.meta.env.DEV) window.location.href = addTicketUrl;
    else window.parent.location.href = addTicketUrl;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    debounce(() => setSearch(e.target.value));

  return (
    <div
      className={cn(
        'w-full h-full bg-card text-card-foreground flex flex-col gap-2 border rounded-md p-4',
        className,
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <TableFilterSubmission />
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={redirectToNewSubmission} className="self-end">
            Add Ticket
          </Button>
          <SearchInput
            placeholder="Search by Title or Reference Id"
            className="w-80"
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <TableDataSubmission submissions={filteredSubmissions} />
    </div>
  );
}
