import { useMemo } from 'react';
import { useDashboardStore } from '@/providers/dashboard.provider';
import {
  Flag,
  Folder,
  FolderCheck,
  FolderLock,
  FolderOpen,
  Info,
} from 'lucide-react';

import { KubeSubmission } from '@/types/kube/kube-submission.type';
import { cn } from '@/lib/utils';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import { CustomerSurvey } from './customer-survey';

export function TicketsOverview({ className }: React.ComponentProps<'div'>) {
  const submissions = useDashboardStore((state) => state.submissions);
  const submissionCategories = useMemo(() => {
    const catagories = {
      New: {
        icon: <Folder size="18" />,
        count: 0,
      },
      'In-Progress': {
        icon: <FolderOpen size="18" />,
        count: 0,
      },
      Resolved: {
        icon: <FolderCheck size="18" />,
        count: 0,
      },
      Closed: {
        icon: <FolderLock size="18" />,
        count: 0,
      },
    };

    const isCategory: (
      submission: KubeSubmission,
    ) => keyof typeof catagories = (submission: KubeSubmission) => {
      switch (submission.sys_Status.toLowerCase()) {
        case 'submitted':
          return 'New';

        case 'resolved':
          return 'Resolved';

        case 'closed':
          return 'Closed';

        default:
          return 'In-Progress';
      }
    };

    submissions.forEach((submission) => {
      const key = isCategory(submission);
      catagories[key].count += 1;
    });

    return catagories;
  }, [submissions]);

  return (
    <div
      className={cn(
        'bg-card text-card-foreground flex rounded-md py-4 divide-x ',
        className,
      )}
    >
      {Object.entries(submissionCategories).map(([key, value]) => (
        <div className="px-4 space-y-2 flex-1 flex-grow" key={key}>
          <div className="tracking-tight text-sm font-medium">
            {key} Tickets
          </div>
          <div className="flex items-center gap-2">
            {value.icon}
            <span className="text-2xl font-bold">{value.count}</span>
          </div>
        </div>
      ))}
      <div className="px-4 space-y-2 flex-1 flex-grow">
        <div className="tracking-tight text-sm font-medium flex items-center gap-2">
          Customer Responses
          <HoverCard>
            <HoverCardTrigger asChild>
              <Info className="cursor-pointer text-blue-700" size={14} />
            </HoverCardTrigger>
            <HoverCardContent className="w-[450px] mr-2">
              <CustomerSurvey className="h-68" />
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="flex items-center gap-2">
          <Flag size={18} />
          <span className="text-2xl font-bold">{50}</span>
        </div>
      </div>
    </div>
  );
}
