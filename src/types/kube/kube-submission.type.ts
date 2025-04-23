export type KubeSubmission = {
  sys_FormId: number;
  sys_FormVersionId: number;
  sys_SubmissionId: number;
  sys_RowNum: number;
  sys_RefNo: number;
  sys_SubmittedBy: string;
  sys_SubmittedDate: string;
  sys_Status: string;
  sysReportedDate: string;
  rdbSeverityLevel: string;
  numSupportManHours: string;
  numSupportManDays: string;
} & Record<string, any>;
