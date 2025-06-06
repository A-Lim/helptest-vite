import {
  DATETIME_FORMAT,
  SEVERITY_COLOR,
  STATUS_BADGE_BG_COLOR,
  STATUS_BADGE_TEXT_COLOR,
} from '@/constants';
import { format } from 'date-fns';

import { KubeSubmission } from '@/types/kube/kube-submission.type';
import { Badge } from '@/components/ui/badge';

export function TableRowSubmission({
  submission,
}: {
  submission: KubeSubmission;
}) {
  return (
    <div className="flex justify-between p-2">
      <div className="flex flex-col gap-1">
        <div className="flex items-center">
          <span className="text-sm font-semibold leading-none">
            {submission.txtTitle}
          </span>
          <span className="ml-2 text-xs text-muted-foreground">
            By {submission.pplReportedBy}
          </span>
        </div>

        <span className="text-xs text-muted-foreground">
          {submission.sys_RefNo}
        </span>

        <p className="leading-none text-xs">
          <span className="font-semibold">Category</span>:{' '}
          {submission.cbTicketType}
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs">
            {format(submission.sys_SubmittedDate, DATETIME_FORMAT)}
          </span>
          <Badge
            style={{
              backgroundColor: SEVERITY_COLOR[submission.rdbSeverityLevel],
            }}
          >
            {submission.rdbSeverityLevel}
          </Badge>
          <Badge
            style={{
              color: STATUS_BADGE_TEXT_COLOR,
              background: STATUS_BADGE_BG_COLOR,
            }}
          >
            {submission.ddlTicketStatus}
          </Badge>
        </div>
      </div>
    </div>
  );
}
