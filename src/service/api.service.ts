import { KubeMatrixRequest } from '@/types/kube/kube-matrix-request.type';
import { KubeMatrix } from '@/types/kube/kube-matrix.type';
import type { KubePaginatedRequest } from '@/types/kube/kube-paginated-request.type';
import type { KubePagination } from '@/types/kube/kube-pagination.type';
import type { KubeSubmission } from '@/types/kube/kube-submission.type';
import { httpPost } from '@/lib/http-request';

// #region SUBMISSIONS
export function getSubmissionList(
  formId: number,
  params: KubePaginatedRequest,
) {
  return httpPost<KubePagination<KubeSubmission>>(
    `Submission/(${formId})/getsubmissionlist`,
    params,
  );
}
// #endregion

// #region MATRICES
export function getMatrix<T>(code: string, params?: KubeMatrixRequest) {
  console.log('GET MATRIX');
  return httpPost<KubePagination<KubeMatrix<T>[]>>(
    `Matrix/${code}/list`,
    params,
  );
}
// #endregion
