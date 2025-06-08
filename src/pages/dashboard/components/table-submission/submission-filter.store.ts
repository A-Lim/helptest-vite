import { useMemo } from 'react';
import { useDashboardStore } from '@/providers/dashboard.provider';
import { create } from 'zustand';

type State = {
  searchStr: string;
  filters: {
    category: string | 'all';
    severity: string | 'all';
    status: string | 'all';
  };
};

type Actions = {
  setSearch: (searchStr: string) => void;
  setFilter: (filter: keyof State['filters'], value: string | 'all') => void;
  resetFilters: () => void;
};

const initialState: State = {
  searchStr: '',
  filters: {
    category: 'all',
    severity: 'all',
    status: 'all',
  },
};

export const useSubmissionFilterStore = create<State & Actions>((set) => ({
  ...initialState,
  setSearch: (searchStr: string) => set(() => ({ searchStr })),
  setFilter: (filter: keyof State['filters'], value: string | 'all') =>
    set((state) => ({
      filters: {
        ...state.filters,
        [filter]: value,
      },
    })),
  resetFilters: () => set(() => initialState),
}));

export function useFilteredSubmissions() {
  const submissions = useDashboardStore((state) => state.submissions);
  const searchStr = useSubmissionFilterStore((state) => state.searchStr);
  const filters = useSubmissionFilterStore((state) => state.filters);

  return useMemo(() => {
    const str = searchStr.toLowerCase();

    return submissions.filter((submission) => {
      const refNo = String(submission.sys_RefNo).toLowerCase();
      const title = submission.txtTitle.toLowerCase();

      // Search string filter (case-insensitive) - exit early if fails
      if (searchStr !== '' && !(title.includes(str) || refNo.includes(str)))
        return false;

      // Category filter - exit early if fails
      // use includes as ccTicketType value will be xxxxx,yyyyyyy
      if (
        filters.category !== 'all' &&
        !submission.cbTicketType.split(',').includes(filters.category)
      )
        return false;

      // Serverity filter - exit early if fails
      if (
        filters.severity !== 'all' &&
        submission.rdbSeverityLevel !== filters.severity
      )
        return false;

      // Status filter - exit early if fails
      if (
        filters.status !== 'all' &&
        submission.ddlTicketStatus !== filters.status
      )
        return false;

      // All conditions passed
      return true;
    });
  }, [submissions, searchStr, filters]);
}
