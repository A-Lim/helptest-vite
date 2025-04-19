export type KubeSubmission = {
  sys_FormId: number;
  sys_FormVersionId: number;
  sys_SubmissionId: number;
  sys_RowNum: number;
  sys_RefNo: number;
} & Record<string, any>;
