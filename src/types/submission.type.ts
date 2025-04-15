export type Submission = {
	sys_FormId: number;
	sys_FormVersionId: number;
	sys_SubmissionId: number;
	sys_RowNum: number;
	sys_RefNo: number;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
} & Record<string, any>;
