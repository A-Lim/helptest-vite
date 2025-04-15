import { post } from '@/lib/api-request';
import type { PaginatedRequest } from '@/types/paginated-request.type';
import type { Pagination } from '@/types/pagination.type';
import type { Submission } from '@/types/submission.type';

export function getSubmissionList(formId: number, params: PaginatedRequest) {
	return post<Pagination<Submission>>(
		`Submission/(${formId})/getsubmissionlist`,
		params,
	);
}
