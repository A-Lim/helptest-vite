import { useMemo } from 'react';
import { SEVERITY_COLOR } from '@/constants';
import { useDashboardStore } from '@/providers/dashboard.provider';

import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import { useSubmissionFilterStore } from './submission-filter.store';

export function TableFilterSubmission() {
  const statuses = useDashboardStore((state) => state.statuses);
  const submissions = useDashboardStore((state) => state.submissions);
  const supportMatrixes = useDashboardStore((state) => state.supportMatrixes);

  const categories = useMemo(
    () => supportMatrixes.map((matrix) => matrix.TicketType),
    [supportMatrixes],
  );

  const statusFilter = useSubmissionFilterStore(
    (state) => state.filters.status,
  );
  const categoryFilter = useSubmissionFilterStore(
    (state) => state.filters.category,
  );
  const severityFilter = useSubmissionFilterStore(
    (state) => state.filters.severity,
  );
  const setFilter = useSubmissionFilterStore((state) => state.setFilter);

  // calculate status with counts
  const statusesWithCount = useMemo(() => {
    const records = statuses.reduce<Record<string, number>>((acc, status) => {
      acc[status.label] = 0;
      return acc;
    }, {});

    submissions.forEach((submission) => {
      if (submission.ddlTicketStatus) records[submission.ddlTicketStatus] += 1;
    });

    return records;
  }, [submissions, statuses]);

  return (
    <div className="flex flex-col gap-2">
      <ToggleGroup
        type="single"
        variant="outline"
        defaultValue="all"
        className="!shadow-none"
        value={statusFilter}
        onValueChange={(value) => setFilter('status', value)}
      >
        <ToggleGroupItem value="all">
          All
          <Badge className="h-5 min-w-5 rounded-full px-1 text-xs">
            {submissions.length}
          </Badge>
        </ToggleGroupItem>
        {Object.entries(statusesWithCount).map(([key, value]) => (
          <ToggleGroupItem key={key} value={key}>
            {key}
            <Badge className="h-5 min-w-5 rounded-full px-1 text-xs">
              {value}
            </Badge>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div className="flex gap-2">
        <Select
          defaultValue="all"
          value={categoryFilter}
          onValueChange={(value) => setFilter('category', value)}
        >
          <SelectTrigger className="w-[150px] border-0 shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Category</SelectItem>
            {categories.map((category, index) => (
              <SelectItem key={index} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          defaultValue="all"
          value={severityFilter}
          onValueChange={(value) => setFilter('severity', value)}
        >
          <SelectTrigger className="w-[150px] border-0 shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severity</SelectItem>
            {Object.keys(SEVERITY_COLOR).map((severity, index) => (
              <SelectItem key={index} value={severity}>
                {severity}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
