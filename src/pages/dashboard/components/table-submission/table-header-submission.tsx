import { useDashboardStore } from '@/providers/dashboard.provider';
import useDebounce from 'react-debounced';

import { Button } from '@/components/ui/button';
import SearchInput from '@/components/search';

import { useSubmissionFilterStore } from './submission-filter.store';
import { TableFilterSubmission } from './table-filter-submission';

export function TableHeaderSubmission() {
  const debounce = useDebounce(300);
  const companyMatrix = useDashboardStore((state) => state.companyMatrix);
  const setSearch = useSubmissionFilterStore((state) => state.setSearch);
  const resetFilters = useSubmissionFilterStore((state) => state.resetFilters);
  const addTicketUrl = `${import.meta.env.VITE_PARENT_URL}/submission/${companyMatrix.FormDesignID}`;

  const redirectToNewSubmission = () => {
    if (import.meta.env.DEV) window.location.href = addTicketUrl;
    else window.parent.location.href = addTicketUrl;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    debounce(() => setSearch(e.target.value));

  return (
    <div className="flex justify-between">
      <TableFilterSubmission />

      <div className="flex flex-col gap-2">
        <div className="flex gap-2 self-end">
          <Button
            onClick={resetFilters}
            variant="destructive"
            className="self-end"
          >
            Reset Filters
          </Button>
          <Button onClick={redirectToNewSubmission}>Add Ticket</Button>
        </div>

        <SearchInput
          placeholder="Search by Title or Reference Id"
          className="w-80"
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
}
